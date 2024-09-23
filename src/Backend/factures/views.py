from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import PrestationType, User
import json


# Récupérer la liste des clients
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


# Récupérer la liste des prestations
def list_prestations(request):
    # Récupérer toutes les prestations depuis la table PrestationType
    prestations = PrestationType.objects.all()

    # Formater les données pour la réponse JSON, en incluant le prix
    prestations_data = [{'id': prestation.id, 'nom': prestation.nom, 'prix': prestation.prix} for prestation in
                        prestations]
    return JsonResponse(prestations_data, safe=False)


# Ajouter une nouvelle prestation manuelle via une requête POST
@csrf_exempt  # Désactiver la protection CSRF pour faciliter le test
def add_prestation(request):
    if request.method == 'POST':
        # Récupérer les données envoyées dans la requête
        try:
            data = json.loads(request.body)
            nom = data.get('nom')
            prix = data.get('prix')

            if not nom or not prix:
                return JsonResponse({'error': 'Nom et prix sont obligatoires'}, status=400)

            # Créer une nouvelle prestation et la sauvegarder dans la base de données
            prestation = PrestationType.objects.create(nom=nom, prix=prix)
            return JsonResponse({'success': 'Prestation ajoutée avec succès', 'id': prestation.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)


# Page d'accueil
def Accueil(request):
    return HttpResponse("<h1>Bienvenue sur la page d'accueil</h1>")
