from django.urls import path
from .views import save_order,get_orders

urlpatterns = [
  
    path('save_order/',save_order,name='save_order'),
    path('get_orders/',get_orders,name='get_order')
]
