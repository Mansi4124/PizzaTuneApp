from django.urls import path
from .views import submit_inquiry,get_inquiries,reply_inquiry,submit_frenchise_inquiry,reply_frenchise_inquiry,get_frenchise_inquiries

urlpatterns = [
    path('submit-inquiry/', submit_inquiry, name='submit_inquiry'),
     path('get_inquiries/', get_inquiries, name='get_inquiries'),
    path('reply_inquiry/', reply_inquiry, name='reply_inquiry'),
    path('submit-frenchise-inquiry/', submit_frenchise_inquiry, name='submit_frenchise_inquiry'),
     path('get_frenchise_inquiries/', get_frenchise_inquiries, name='get_frenchise_inquiries'),
    path('reply_frenchise_inquiry/', reply_frenchise_inquiry, name='reply_frenchise_inquiry'),
    
]
