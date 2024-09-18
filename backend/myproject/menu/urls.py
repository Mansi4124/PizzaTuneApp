# menu/urls.py
from django.urls import path
from .views import add_menu_item, get_menu_items, get_menu_item, update_menu_item, delete_menu_item

urlpatterns = [
    path('add/', add_menu_item),
    path('', get_menu_items),
    path('<str:item_id>/', get_menu_item),
    path('<item_id>/update/', update_menu_item),
    path('<str:item_id>/delete/', delete_menu_item),
]
