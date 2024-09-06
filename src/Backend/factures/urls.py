from django.urls import path
from .views import list_clients, Accueil

urlpatterns = [
    path('clients/', list_clients, name='list_clients'),  # Route pour la liste des clients
]
