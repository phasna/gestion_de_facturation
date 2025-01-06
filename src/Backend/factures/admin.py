from django.contrib import admin
from .models import Client_infos, Document, Prestation, Service, Facture, PrestationType, Poste

# Personnalisation de l'affichage dans l'admin
@admin.register(Client_infos)
class ClientInfosAdmin(admin.ModelAdmin):
    list_display = ('nom', 'prenom', 'email', 'ville', 'tel_mobile', 'siret', 'role')
    search_fields = ('nom', 'prenom', 'email', 'ville')
    list_filter = ('role', 'ville')  # Filtres pour un tri rapide

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('nom', 'type_document', 'client', 'facture', 'date_update')
    search_fields = ('nom', 'type_document', 'client__nom', 'facture__id')
    list_filter = ('type_document',)

@admin.register(Prestation)
class PrestationAdmin(admin.ModelAdmin):
    list_display = ('service_nom', 'prix', 'quantite', 'facture')
    search_fields = ('service_nom', 'facture__id')
    list_filter = ('facture',)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('client', 'nombre_produit')
    search_fields = ('client__nom',)
    list_filter = ('client',)

# Nouveau : Configuration pour le modèle Facture
@admin.register(Facture)
class FactureAdmin(admin.ModelAdmin):
    list_display = ('id', 'client', 'total', 'status', 'date_creation')
    search_fields = ('client__nom', 'client__email', 'id')
    list_filter = ('status', 'date_creation')
    ordering = ('-date_creation',)  # Dernières factures en premier

@admin.register(PrestationType)
class PrestationTypeAdmin(admin.ModelAdmin):
    list_display = ('nom', 'description', 'prix')
    search_fields = ('nom',)

@admin.register(Poste)
class PosteAdmin(admin.ModelAdmin):
    list_display = ('nom_poste', 'description')
    search_fields = ('nom_poste',)
