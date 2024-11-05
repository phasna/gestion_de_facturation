from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import PrestationType, Client_infos, Poste, Facture, Prestation, Connection
from django.db.models import Sum
import json
from django.contrib.auth import authenticate


def Accueil(request):
    return HttpResponse("<h1>Bienvenue sur la page d'accueil</h1>")


@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            nom = data.get('nom')
            prenom = data.get('prenom')
            email = data.get('email')
            username = data.get('username')
            password = data.get('password')
            siret = data.get('siret')
            ville = data.get('ville')
            tel_mobile = data.get('tel_mobile')

            if not all([nom, prenom, email, username, password]):
                return JsonResponse({'error': 'Tous les champs sont obligatoires'}, status=400)

            connection = Connection.objects.create_user(
                email=email, username=username, password=password, nom=nom,
                prenom=prenom, siret=siret, ville=ville, tel_mobile=tel_mobile
            )
            return JsonResponse({'success': True, 'user_id': connection.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Données JSON invalides'}, status=400)

    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)


@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                return JsonResponse({
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'username': user.username,
                    }
                })
            else:
                return JsonResponse({'error': 'Nom d\'utilisateur ou mot de passe incorrect'}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Données JSON invalides'}, status=400)

    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)


@csrf_exempt
def list_clients(request):
    try:
        clients = Client_infos.objects.all()
        clients_data = [{
            'id': client.id,
            'nom': client.nom,
            'prenom': client.prenom,
            'email': client.email,
            'ville': client.ville,
            'tel_mobile': client.tel_mobile
        } for client in clients]

        return JsonResponse(clients_data, safe=False)

    except Exception as e:
        return JsonResponse({'error': str(e), 'details': 'Erreur lors de la récupération des clients'}, status=500)

@csrf_exempt
def list_prestations(request):
    try:
        prestations = PrestationType.objects.all()
        prestations_data = [{'id': prestation.id, 'nom': prestation.nom, 'prix': prestation.prix} for prestation in prestations]

        return JsonResponse(prestations_data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e), 'details': 'Erreur lors de la récupération des prestations'}, status=500)


@csrf_exempt
def add_prestation(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            nom = data.get('nom')
            prix = data.get('prix')

            if not nom or prix is None:
                return JsonResponse({'error': 'Nom et prix sont obligatoires'}, status=400)

            prestation = PrestationType.objects.create(nom=nom, prix=prix)
            return JsonResponse({'success': 'Prestation ajoutée avec succès', 'id': prestation.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Données JSON invalides'}, status=400)

    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)


@csrf_exempt
def add_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            nom = data.get('nom')
            prenom = data.get('prenom')
            email = data.get('email')
            phone = data.get('phone')
            city = data.get('city')
            address = data.get('address')
            role = data.get('role')
            poste = data.get('poste')

            if not all([nom, prenom, email, phone, city, address, role]):
                return JsonResponse({'error': 'Tous les champs sont obligatoires'}, status=400)

            client = Client_infos.objects.create(
                nom=nom,
                prenom=prenom,
                email=email,
                tel_mobile=phone,
                ville=city,
                role=role,
                poste_occuped=poste
            )
            return JsonResponse({'success': True, 'client_id': client.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Données JSON invalides'}, status=400)

    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)


def list_postes(request):
    postes = Poste.objects.all()
    postes_data = [{'id': poste.id, 'nom_poste': poste.nom_poste, 'description': poste.description} for poste in postes]
    return JsonResponse(postes_data, safe=False)


def client_prestations_data(request):
    clients = Client_infos.objects.prefetch_related('factures')

    client_data = []
    for client in clients:
        prestations = Prestation.objects.filter(facture__client=client)
        total_prestations = prestations.count()
        total_chiffre_affaires = sum([p.prix * p.quantite for p in prestations])

        client_data.append({
            'client_id': client.id,
            'client_nom': client.nom,
            'client_prenom': client.prenom,
            'nombre_prestations': total_prestations,
            'chiffre_affaires': total_chiffre_affaires
        })

    return JsonResponse(client_data, safe=False)


def chiffre_affaires_par_mois(request):
    data = Facture.objects.annotate(
        mois=models.functions.TruncMonth('date_creation')
    ).values('mois').annotate(
        total_chiffre_affaires=Sum('total')
    ).order_by('mois')

    return JsonResponse(list(data), safe=False)

@csrf_exempt
def add_facture(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            client_id = data.get('client')
            prestations_data = data.get('prestations')

            if not client_id or not prestations_data:
                return JsonResponse({'error': 'Les champs client et prestations sont obligatoires'}, status=400)


            client = Client_infos.objects.get(id=client_id)


            facture = Facture.objects.create(client=client, total=0)


            total_facture = 0
            for prestation_data in prestations_data:
                prestation = PrestationType.objects.get(nom=prestation_data['service'])
                quantite = prestation_data.get('quantite', 1)
                total_facture += prestation.prix * quantite
                Prestation.objects.create(
                    facture=facture,
                    service_nom=prestation.nom,
                    prix=prestation.prix,
                    quantite=quantite
                )


            facture.total = total_facture
            facture.save()

            return JsonResponse({'success': True, 'facture_id': facture.id}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e), 'details': 'Erreur lors de la création de la facture'}, status=500)


def download_facture(request, facture_id):
    try:
        facture = Facture.objects.get(id=facture_id)


        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="facture_{facture.id}.pdf"'

        p = canvas.Canvas(response)
        p.drawString(100, 750, f"Facture ID: {facture.id}")
        p.drawString(100, 730, f"Client: {facture.client.nom} {facture.client.prenom}")
        p.drawString(100, 710, f"Total: {facture.total}")


        p.showPage()
        p.save()
        return response

    except Facture.DoesNotExist:
        return JsonResponse({'error': 'Facture introuvable'}, status=404)
