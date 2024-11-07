from django.urls import path
from . import views

urlpatterns = [
    path('', views.Accueil, name='accueil'),

    # Auth endpoints
    path('register/', views.register_user, name='register_user'),
    path('login/', views.login_user, name='login_user'),

    # Clients endpoints
    path('clients/', views.list_clients, name='list_clients'),
    path('add-client/', views.create_or_add_client, name='add_client'),

    # Prestations endpoints
    path('prestations/', views.list_prestations, name='list_prestations'),

    # Postes and Roles
    path('roles/', views.list_postes, name='list_postes'),

    # Facture endpoints
    path('factures/add/', views.add_facture, name='add_facture'),
    path('factures/<int:facture_id>/download/', views.download_facture, name='download_facture'),

    # Additional data endpoints
    path('client-prestations/', views.client_prestations_data, name='client_prestations_data'),
    path('chiffre-affaires/', views.chiffre_affaires_par_mois, name='chiffre_affaires_par_mois'),
]

