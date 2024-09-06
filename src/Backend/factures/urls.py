from django.urls import path
from . import views

urlpatterns = [
    path('clients/', views.list_clients, name='list_clients'),
    path('prestations/', views.list_prestations, name='list_prestations'),
]




