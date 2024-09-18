import datetime
from bson import ObjectId
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from pymongo import MongoClient

# Initialize MongoDB client
client = MongoClient('mongodb://localhost:27017/')
db = client['myproject']
contact = db['query']

@csrf_exempt
def submit_inquiry(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get('customerName')
            email = data.get('customerEmail')
            query = data.get('customerQuery')

            # Validate the data
            if not name or not email or not query:
                return JsonResponse({"success": False, "message": "All fields are required."})

            # Insert data into MongoDB
            contact.insert_one({
                'name': name,
                'email': email,
                'query': query,
                'submitted_at': datetime.datetime.now()  # Add timestamp for when the inquiry was submitted
            })

            return JsonResponse({"success": True, "message": "Inquiry submitted successfully"})
        except json.JSONDecodeError:
            return JsonResponse({"success": False, "message": "Invalid data"})
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)})
    else:
        return JsonResponse({"success": False, "message": "Invalid request method"})

def get_inquiries(request):
    if request.method == "GET":
        try:
            inquiries = list(contact.find({}, {'_id': 1, 'name': 1, 'email': 1, 'query': 1}))
            # Convert ObjectId to string
            for inquiry in inquiries:
                inquiry['_id'] = str(inquiry['_id'])
            return JsonResponse({"inquiries": inquiries})
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)})
    else:
        return JsonResponse({"success": False, "message": "Invalid request method"})
@csrf_exempt
def reply_inquiry(request):
    if request.method == "POST":
        try:
            # Parse the request data
            data = json.loads(request.body)
            inquiry_id = data.get('inquiryId')
            reply = data.get('reply')

            if not inquiry_id or not reply:
                return JsonResponse({"success": False, "message": "Inquiry ID and reply message are required."})

            # Fetch the inquiry from the MongoDB database
            inquiry = contact.find_one({'_id': ObjectId(inquiry_id)})
            if not inquiry:
                return JsonResponse({"success": False, "message": "Inquiry not found"})

            customer_email = inquiry['email']

            # Send the reply email
            send_mail(
                subject="Response to Your Inquiry",
                message=reply,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[customer_email],
                fail_silently=False  # Set to True if you want to suppress errors
            )

            # Optionally, you could store the reply in the database
            contact.update_one(
                {'_id': ObjectId(inquiry_id)},
                {'$set': {'reply': reply, 'replied_at': datetime.datetime.now()}}
            )

            return JsonResponse({"success": True, "message": "Reply sent successfully"})
        except json.JSONDecodeError:
            return JsonResponse({"success": False, "message": "Invalid JSON format"})
        except Exception as e:
            # Log the exception for debugging
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Error sending email: {str(e)}")
            return JsonResponse({"success": False, "message": "An error occurred while sending the email"})
    else:
        return JsonResponse({"success": False, "message": "Invalid request method"})