from django.urls import path
from . import views

urlpatterns = [
    path('clients/', views.list_clients, name='list_clients'),
    path('prestations/', views.list_prestations, name='list_prestations'),
    path('users/add/', views.add_user, name='add_user'),
    path('roles/', views.list_postes, name='list_postes'),
    path('add-facture/', views.add_facture, name='add_facture'),
]
