from django.http import JsonResponse, HttpResponse
from .models import User


def list_clients(request):
    # Récupérer uniquement les utilisateurs qui sont des clients
    clients = User.objects.filter(is_client=True)

    # Formater les données pour la réponse JSON
    clients_data = [{
        'id': client.id,
        'nom': client.nom,
        'prenom': client.prenom,
        'email': client.email,
        'ville': client.ville,
        'tel_mobile': client.tel_mobile
    } for client in clients]

    return JsonResponse(clients_data, safe=False)


def Accueil(request):
    return HttpResponse("<h1>Bienvenue sur la page d'accueil</h1>")
