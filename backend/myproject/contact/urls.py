from django.urls import path
from .views import submit_inquiry,get_inquiries,reply_inquiry

urlpatterns = [
    path('submit-inquiry/', submit_inquiry, name='submit_inquiry'),
     path('get_inquiries/', get_inquiries, name='get_inquiries'),
    path('reply_inquiry/', reply_inquiry, name='reply_inquiry'),
]
