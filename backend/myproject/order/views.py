import json
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
from bson import ObjectId

# Connect to your MongoDB database
mongo_db_uri = os.getenv('MONGO_DB_URI')
mongo_db_database=os.getenv('MONGO_DB_NAME')
print(mongo_db_database)

client = MongoClient(
    mongo_db_uri,
    serverSelectionTimeoutMS=5000,  # 5 seconds timeout
    connectTimeoutMS=5000
)
db = client[mongo_db_database]
orders_collection = db['orders']  # Collection for storing orders

@csrf_exempt
def save_order(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # Extract order details from the request
            email = data.get('email')
            customer_name = data.get('name')
            cart_items = data.get('cartItems')
            total_amount = data.get('totalAmount')
            current_date = data.get('orderDate')
            
            # Create an order document
            order = {
                'customer': customer_name,
                'email': email,
                'cartItems': cart_items,
                'totalAmount': total_amount,
                'date': current_date
            }

            # Insert the order into the database
            orders_collection.insert_one(order)

            return JsonResponse({'message': 'Order saved successfully!'}, status=200)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)

    return JsonResponse({'message': 'Invalid request method'}, status=400)

def get_orders(request):
    try:
        # Fetch all orders from MongoDB
        orders = list(orders_collection.find())

        # Convert the ObjectId to a string for JSON serialization
        for order in orders:
            order['_id'] = str(order['_id'])

        return JsonResponse({'orders': orders}, status=200)
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=500)
