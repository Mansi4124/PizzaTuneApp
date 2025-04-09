# menu/views.py
# menu/views.py



import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
import json
import cloudinary.uploader
import cloudinary
from bson import ObjectId
mongo_db_uri = os.getenv('MONGO_DB_URI')
mongo_db_database=os.getenv('MONGO_DB_NAME')
client = MongoClient(mongo_db_uri)
db = client[mongo_db_database]
menu_collection = db['menu_items']

@csrf_exempt
def add_menu_item(request):
    print("Cloudinary Config:", cloudinary.config())
    if request.method == "POST":
        # Handle form data
        data = {
            'name': request.POST.get('name'),
            'description': request.POST.get('description'),
            'price': request.POST.get('price'),
            'category': request.POST.get('category'),
            'isVeg': request.POST.get('isVeg') == 'true',
        }

        # Handle file upload
        if 'image' in request.FILES:
            image = request.FILES['image']
            # Upload image to Cloudinary
            result = cloudinary.uploader.upload(image)
            data['image_url'] = result['secure_url']  # Save the secure URL from Cloudinary

        # Insert into MongoDB
        menu_collection.insert_one(data)
        return JsonResponse({"message": "Menu item added successfully"}, status=201)

    return JsonResponse({"error": "Invalid request method"}, status=400)

@csrf_exempt
def get_menu_items(request):
    if request.method == "GET":
        items = list(menu_collection.find())
        for item in items:
            item['_id'] = str(item['_id'])  # Convert ObjectId to string
        return JsonResponse({"items": items}, status=200)
    return JsonResponse({"error": "Invalid request method"}, status=400)

@csrf_exempt
def get_menu_item(request, item_id):
    if request.method == "GET":
        item = menu_collection.find_one({"_id": item_id})
        if item:
            item['_id'] = str(item['_id'])  # Convert ObjectId to string
            return JsonResponse({"item": item}, status=200)
        return JsonResponse({"error": "Item not found"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=400)


# menu/views.py
@csrf_exempt


@csrf_exempt
def update_menu_item(request, item_id):
    print('item_id',item_id,request.method)
    if request.method == "POST":
        print("entered in put")
        #data = json.loads(request.body)
        data = {
            'name': request.POST.get('name'),
            'description': request.POST.get('description'),
            'price': request.POST.get('price'),
            'category': request.POST.get('category'),
            'isVeg': request.POST.get('isVeg') == 'true',
        }
        print(data)
        update_data = {
            'name': data.get('name'),
            'description': data.get('description'),
            'price': data.get('price'),
            'category': data.get('category'),
            'isVeg': data.get('isVeg'),
        }
        print("Till")
        if 'image' in request.FILES:
            image = request.FILES['image']
            result = cloudinary.uploader.upload(image)
            update_data['image_url'] = result['secure_url']

        menu_collection.update_one({"_id": ObjectId(item_id)}, {"$set": update_data})
        return JsonResponse({"message": "Menu item updated successfully"}, status=200)
    return JsonResponse({"error": "Invalid request method"}, status=400)

@csrf_exempt
def delete_menu_item(request, item_id):
    print("item_id",item_id)
    if request.method == "DELETE":
        menu_collection.delete_one({"_id": ObjectId(item_id)})
        return JsonResponse({"message": "Menu item deleted successfully"}, status=200)
    return JsonResponse({"error": "Invalid request method"}, status=400)
