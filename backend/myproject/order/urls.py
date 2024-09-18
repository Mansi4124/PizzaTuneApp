from django.urls import path
from .views import create_order, get_orders

urlpatterns = [
    path('create/', create_order, name='create_order'),
    path('get/', get_orders, name='get_orders'),
]
