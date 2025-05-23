"""
Django settings for myproject project.

Generated by 'django-admin startproject' using Django 5.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""
import cloudinary
import cloudinary.uploader
import cloudinary.api
from pathlib import Path
import os 
from decouple import config
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
from decouple import config

SECRET_KEY = config("SECRET_KEY")
DEBUG = config("DEBUG", default=False, cast=bool)
MONGO_DB_NAME = config("MONGO_DB_NAME")
MONGO_DB_URI = config("MONGO_DB_URI")

# customer/mongodb_client.py

from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
# MongoDB connection settings
# settings.py
from pymongo import MongoClient

# MONGO_CLIENT = MongoClient("mongodb://localhost:27017")  # Update with your MongoDB URI

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'mansipatel9898.mp@gmail.com'
EMAIL_HOST_PASSWORD = 'soii dtwn pqif bipf'
DEFAULT_FROM_EMAIL = 'mansipatel9898.mp@gmail.com'
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# # SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = 

# # SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = True


CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://pizzatuneapp-10.onrender.com",
    "https://pizza-tune-app-tnkz.vercel.app/"
]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'customer',
    'menu',
     'cloudinary',
    'cloudinary_storage',
    'order',
    'contact'
]

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'dgnnbm4bw',
    'API_KEY': '776918634187157',
    'API_SECRET': 'VNzdZeZmks7QpVteKinMvh9NdvM'
}
cloudinary.config(
  cloud_name='dgnnbm4bw',
  api_key='776918634187157',
  api_secret='VNzdZeZmks7QpVteKinMvh9NdvM'
)
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
   
    
]
ALLOWED_HOSTS = ['*']
SECURE_SSL_REDIRECT = False



ROOT_URLCONF = 'myproject.urls'
CSRF_TRUSTED_ORIGINS = ['http://localhost:3000','https://pizzatuneapp-10.onrender.com', "https://pizza-tune-app-tnkz.vercel.app/"]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'myproject.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
CORS_ALLOW_HEADERS = ['*']
CORS_ALLOW_METHODS = ['*']
CORS_ALLOW_CREDENTIALS = True

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# settings.py

MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware'] + MIDDLEWARE

