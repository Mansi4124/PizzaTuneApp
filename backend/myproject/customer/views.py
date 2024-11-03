from django.http import JsonResponse
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
import json
import re
from pymongo import MongoClient
import uuid
from bson import ObjectId
from django.core.mail import EmailMessage
from django.http import JsonResponse
from django.conf import settings

client = MongoClient("mongodb://localhost:27017/")

db = client.myproject
customer_collection = db.customers

@csrf_exempt
def sign_up(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data["email"]
        password = data["password"]
        cpass = data["cpassword"]
        role = data.get("role", "")  # Get the role from the request

        re_email = r"^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$"
        if not re.match(re_email, email):
            return JsonResponse(
                {"email": "Invalid Email, please enter a valid email address"}
            )

        re_password = r"^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$"
        if not re.match(re_password, password):
            return JsonResponse(
                {
                    "password": "Invalid Password, please use a password of 8 or more characters having at least 1 symbol, 1 capital letter & 1 number"
                }
            )

        if password != cpass:
            return JsonResponse({"cpassword": "Password does not match"})

        user_id = str(uuid.uuid4())

        data["user_id"] = user_id
        data["role"] = role  # Save the role

        user = customer_collection.find_one({"email": email})

        if user:
            return JsonResponse(
                {"accountFound": "An account with this email already exists"}
            )
        else:
            customer_collection.insert_one(data)
            return JsonResponse(
                {
                    "message": f"Welcome {email}",
                    "user_id": data["user_id"],
                    "role": role,  # Include role in response
                    "success": True,
                },
                status=200,
            )


@csrf_exempt
def sign_in(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data["email"]
        password = data["password"]

        regex = r"^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$"
        if not re.match(regex, email):
            return JsonResponse(
                {"email": "Invalid Email , please enter a valid email address"}
            )

        user = customer_collection.find_one({"email": email})
        if user is not None:
            if password != user["password"]:
                return JsonResponse({"notMatch": "Password is invalid"})
        else:
            return JsonResponse({"notMatch": "No such user with this email found"})

        return JsonResponse(
            {
                "message": f"Welcome {email}",
                "user_id": user["user_id"],
                "role": user.get("role", ""),  # Include role in response
                "success": True,
            },
            status=200,
        )


@csrf_exempt
def get_customer_data(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_id = data.get("user_id")
        user = customer_collection.find_one({"user_id": user_id})
        if user:
            user["_id"] = str(user["_id"])
            print(user)  # Add this line to log the user data
            return JsonResponse({"user": user})
        return JsonResponse({"message": "User not found"}, status=404)


def send_email_with_bill(to_email, subject, message):
    email = EmailMessage(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        [to_email]
    )
    email.send()


from django.http import JsonResponse
from django.core.mail import EmailMessage
from django.views.decorators.csrf import csrf_exempt
import json
from django.conf import settings

@csrf_exempt
def generate_and_send_bill(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            cart_items = data.get('cartItems', [])
            total_amount = float(data.get('totalAmount', 0))  # Ensure total_amount is a float

            # Validate input data
            if not email:
                return JsonResponse({'message': 'Email is required'}, status=400)
            if not cart_items:
                return JsonResponse({'message': 'Cart items are required'}, status=400)

            # Construct the bill message in HTML format
            message = """
            <html>
            <body>
                <h2>Your Order Summary</h2>
                <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
            """

            for item in cart_items:
                item_name = item.get('name', 'Unknown Item')
                item_qty = int(item.get('qty', 0))  # Ensure quantity is an integer
                item_price = float(item.get('price', 0))  # Ensure price is a float
                item_total = item_qty * item_price
                message += f"""
                <tr>
                    <td>{item_name}</td>
                    <td>{item_qty}</td>
                    <td>Rs. {item_price:.2f}</td>
                    <td>Rs. {item_total:.2f}</td>
                </tr>
                """

            message += f"""
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" style="text-align: right;"><strong>Total Amount:</strong></td>
                            <td><strong>Rs. {total_amount:.2f}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </body>
            </html>
            """

            # Send the email
            email_message = EmailMessage(
                'Your Order Bill',
                message,
                settings.EMAIL_HOST_USER,
                [email]
            )
            email_message.content_subtype = "html"  # Important: Specify the email content type as HTML
            email_message.send(fail_silently=False)

            return JsonResponse({'message': 'Bill sent successfully!'})
        except Exception as e:
            print(f"Error sending bill: {e}")  # Print the error for debugging
            return JsonResponse({'message': 'Failed to send the bill', 'error': str(e)}, status=500)
    else:
        return JsonResponse({'message': 'Invalid HTTP method'}, status=405)
