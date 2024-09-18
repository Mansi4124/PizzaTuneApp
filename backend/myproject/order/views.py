import uuid
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
import json

client = MongoClient('mongodb://localhost:27017/')
db = client['myproject']
menu_collection = db['order']

@csrf_exempt
def create_order(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_id = data.get("user_id")
        items = data.get("items")
        total_amount = data.get("total_amount")

        # Insert the new order into the orders collection
        order_id = str(uuid.uuid4())
        order_data = {
            "_id": order_id,
            "user_id": user_id,
            "items": items,
            "total_amount": total_amount,
            "created_at": datetime.datetime.now()
        }
        menu_collection.insert_one(order_data)

        return JsonResponse({"message": "Order created successfully", "order_id": order_id}, status=201)
    
    return JsonResponse({"message": "Invalid request method"}, status=400)


@csrf_exempt
def get_orders(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_id = data.get("user_id")

        # Fetch orders for the user
        orders = menu_collection.find({"user_id": user_id})
        orders_list = list(orders)

        # Convert orders to list of dicts
        for order in orders_list:
            order["_id"] = str(order["_id"])  # Convert ObjectId to string

        return JsonResponse({"orders": orders_list})
    
    return JsonResponse({"message": "Invalid request method"}, status=400)
