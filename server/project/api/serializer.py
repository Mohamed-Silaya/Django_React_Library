from rest_framework import serializers
from .models import Book



class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields ='__all__'  # id is auto-generated, so it