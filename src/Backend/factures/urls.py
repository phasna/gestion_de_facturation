from django.urls import path
from . import views

urlpatterns = [
    # Accueil
    path('', views.Accueil, name='accueil'),

    # Auth endpoints
    path('register/', views.register_user, name='register_user'),
    path('login/', views.login_user, name='login_user'),

    # Clients endpoints
    path('clients/', views.list_clients, name='list_clients'),
    path('clients/<int:pk>/', views.client_detail, name='client_detail'),
    path('add-client/', views.create_or_add_client, name='add_client'),
    path('clients/<int:pk>/update/', views.client_update, name='client_update'),
    path('clients/<int:pk>/delete/', views.client_delete, name='client_delete'),

    # Prestations endpoints
    path('prestations/', views.list_prestations, name='list_prestations'),
    path('add-prestation/', views.add_prestation, name='add_prestation'),

    # Postes and Roles
    path('roles/', views.list_postes, name='list_postes'),

    # Factures endpoints
    path('factures/add/', views.add_facture, name='add_facture'),
    path('factures/<int:facture_id>/download/', views.download_facture, name='download_facture'),

    # Devis endpoints
    path('devis/add/', views.add_devis, name='add_devis'),
    path('devis/<int:devis_id>/validate/', views.validate_devis, name='validate_devis'),
    path('devis/', views.list_devis, name='list_devis'),

    # Additional data endpoints
    path('client-prestations/', views.client_prestations_data, name='client_prestations_data'),
    path('clients-with-details/', views.clients_with_details, name='clients_with_details'),

    # Chiffre d'affaires et statistiques
    path('chiffre-affaires-par-mois/', views.chiffre_affaires_par_mois, name='chiffre_affaires_par_mois'),
    path('chiffre-affaires-total/', views.chiffre_affaires_total, name='chiffre_affaires_total'),
    path('total-ventes/', views.total_ventes, name='total_ventes'),
    path('clients-actifs/', views.clients_actifs, name='clients_actifs'),
    path('graphique-chiffre-affaires/', views.graphique_chiffre_affaires, name='graphique_chiffre_affaires'),

    # Historique des clients
    path('historique-clients/', views.historique_clients, name='historique_clients'),
]
