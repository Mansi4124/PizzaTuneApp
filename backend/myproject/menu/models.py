from django.db import models

class MenuItem(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255)
    image = models.ImageField(upload_to='menu_images/')
    is_veg = models.BooleanField(default=True)  # For veg icon
   
    
    def __str__(self):
        return self.name
