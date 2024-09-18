from django.urls import path
from .views import (
    sign_in,
    sign_up,
    get_customer_data,
     generate_and_send_bill
)

urlpatterns = [
    path("signin/", sign_in),
    path("signup/", sign_up),
    path("get_customer_data/", get_customer_data),
    path('send_bill/', generate_and_send_bill, name='send_bill'),
]