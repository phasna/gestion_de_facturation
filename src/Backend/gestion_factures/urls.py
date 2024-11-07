from django.contrib import admin
from django.urls import path, include
from factures.views import Accueil  # Importer la vue Accueil

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', Accueil, name='Accueil'),  # Page d'accueil
    path('api/', include('factures.urls')),  # Inclure les routes de "factures" sous le préfixe "api/"
]
