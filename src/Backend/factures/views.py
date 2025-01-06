import json
import logging
from django.http import JsonResponse
from .models import Client_infos

from django.contrib.auth import authenticate
from django.db.models import Sum
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.views.decorators.csrf import csrf_exempt

from . import models
from .models import PrestationType, Poste, Facture, Prestation, Connection, Devis
from django.db.models import Count
from django.db.models.functions import TruncMonth

from datetime import datetime
from calendar import month_name


logger = logging.getLogger(__name__)

def Accueil(request):
    return HttpResponse("<h1>Bienvenue sur la page d'accueil</h1>")


@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            # Valider les champs requis
            required_fields = ['nom', 'prenom', 'email', 'username', 'password']
            for field in required_fields:
                if not data.get(field):
                    return JsonResponse({'error': f'Le champ {field} est requis'}, status=400)

            # Créer l'utilisateur
            connection = Connection.objects.create_user(
                username=data['username'],
                email=data['email'],
                password=data['password']
            )

            # Lier les informations du client à l'utilisateur
            Client_infos.objects.create(
                nom=data['nom'],
                prenom=data['prenom'],
                email=data['email'],
                tel_mobile=data.get('tel_mobile', ''),
                ville=data.get('ville', ''),
                siret=data.get('siret', '')
            )

            return JsonResponse({'success': True, 'user_id': connection.id}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

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
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def list_prestations(request):
    try:
        prestations = PrestationType.objects.all()
        prestations_data = [{'id': p.id, 'nom': p.nom, 'prix': p.prix} for p in prestations]
        return JsonResponse(prestations_data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


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
def create_or_add_client(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            # Validation des champs requis
            required_fields = ['nom', 'prenom', 'email', 'siret', 'tel_mobile', 'ville']
            for field in required_fields:
                if field not in data or not data[field]:
                    return JsonResponse({"error": f"Le champ {field} est obligatoire."}, status=400)

            # Création du client
            client = Client_infos.objects.create(
                nom=data['nom'],
                prenom=data['prenom'],
                email=data['email'],
                siret=data['siret'],
                tel_mobile=data['tel_mobile'],
                ville=data['ville'],
                adresse=data.get('adresse', ''),  # Champ optionnel
                code_postal=data.get('code_postal', '')  # Champ optionnel
            )

            return JsonResponse({"message": "Client ajouté avec succès", "client_id": client.id}, status=201)

        except Exception as e:
            logger.error(f"Erreur lors de l'ajout du client : {e}")
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Méthode non autorisée"}, status=405)





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

@csrf_exempt
def add_facture(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            client_id = data.get('client')
            prestations = data.get('prestations')  # Liste des prestations

            if not client_id or not prestations:
                return JsonResponse({'error': 'Client et prestations sont requis'}, status=400)

            client = Client_infos.objects.get(id=client_id)
            facture = Facture.objects.create(client=client, total=0, status='paid')  # Facture validée directement

            total = 0
            for p in prestations:
                prestation = PrestationType.objects.get(id=p['id'])
                quantite = p.get('quantite', 1)
                Prestation.objects.create(
                    facture=facture,
                    service_nom=prestation.nom,
                    prix=prestation.prix,
                    quantite=quantite
                )
                total += prestation.prix * quantite

            facture.total = total
            facture.save()

            # Mettre à jour le statut du client
            client_status = 'Payé' if facture.status == 'paid' else 'Non payé'
            return JsonResponse({
                'success': 'Facture créée',
                'facture_id': facture.id,
                'client': {
                    'id': client.id,
                    'nom': client.nom,
                    'prenom': client.prenom,
                    'status': client_status,
                    'price': total
                }
            }, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)




def download_facture(request, facture_id):
    try:
        facture = Facture.objects.get(id=facture_id)
        template_path = 'facture_template.html'  # Un fichier HTML pour le rendu
        context = {'facture': facture}
        html = render_to_string(template_path, context)

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="facture_{facture.id}.pdf"'

        from src.Backend.env.bin import pisa
        pisa_status = pisa.CreatePDF(html, dest=response)
        if pisa_status.err:
            return HttpResponse(f'Erreur lors de la création du PDF: {pisa_status.err}', status=500)
        return response
    except Facture.DoesNotExist:
        return JsonResponse({'error': 'Facture introuvable'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt  # Facultatif si vous utilisez CSRF
def client_detail(request, pk):
    try:
        client = Client_infos.objects.get(pk=pk)

        if request.method == 'GET':
            client_data = {
                'id': client.id,
                'nom': client.nom,
                'prenom': client.prenom,
                'email': client.email,
                'ville': client.ville,
                'tel_mobile': client.tel_mobile,
                'siret': client.siret,
                'adresse': client.adresse,  # Si disponible
                'code_postal': client.code_postal  # Si disponible
            }
            return JsonResponse(client_data)

        elif request.method == 'DELETE':
            client.delete()
            return JsonResponse({'message': 'Client supprimé avec succès'}, status=204)

        else:
            return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

    except Client_infos.DoesNotExist:
        return JsonResponse({'error': 'Client non trouvé'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def client_update(request, pk):
    if request.method == 'PUT':
        try:
            client = Client_infos.objects.get(pk=pk)
            data = json.loads(request.body)

            # Mise à jour sécurisée des champs
            fields = ['nom', 'prenom', 'adresse', 'tel_mobile', 'email', 'ville', 'siret', 'code_postal']
            for field in fields:
                if field in data:
                    setattr(client, field, data[field])

            client.save()
            return JsonResponse({'message': 'Client mis à jour avec succès'}, status=200)
        except Client_infos.DoesNotExist:
            return JsonResponse({'error': 'Client non trouvé'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)


@csrf_exempt
def client_delete(request, pk):
    if request.method == 'DELETE':
        try:
            client = Client_infos.objects.get(pk=pk)
            client.delete()
            return JsonResponse({'message': 'Client supprimé avec succès'}, status=204)
        except Client_infos.DoesNotExist:
            return JsonResponse({'error': 'Client non trouvé'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

@csrf_exempt
def add_devis(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            client_id = data.get('client')
            prestations = data.get('prestations')

            if not client_id or not prestations:
                return JsonResponse({'error': 'Client et prestations sont requis'}, status=400)

            client = Client_infos.objects.get(id=client_id)

            # Créer un devis
            devis = Devis.objects.create(client=client, total=0, validé=False)

            total = 0
            for p in prestations:
                prestation_type = PrestationType.objects.get(id=p['id'])
                quantite = p.get('quantite', 1)
                # Pas de lien direct entre Devis et Prestation ici, à gérer séparément si nécessaire
                total += prestation_type.prix * quantite

            devis.total = total
            devis.save()

            return JsonResponse({'success': 'Devis créé', 'devis_id': devis.id}, status=201)

        except Client_infos.DoesNotExist:
            return JsonResponse({'error': 'Client introuvable'}, status=404)
        except PrestationType.DoesNotExist:
            return JsonResponse({'error': 'Prestation introuvable'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)


@csrf_exempt
def validate_devis(request, devis_id):
    if request.method == 'POST':
        try:
            # Récupérer le devis qui n'est pas encore validé
            devis = Devis.objects.get(id=devis_id, validé=False)

            # Créer une facture associée
            facture = Facture.objects.create(
                client=devis.client,
                total=devis.total,
                status='paid'  # Marquer comme payée immédiatement
            )

            # Associer les prestations du devis à la facture
            prestations = Prestation.objects.filter(devis=devis)
            for prestation in prestations:
                prestation.facture = facture
                prestation.devis = None  # Dissocier du devis
                prestation.save()

            # Marquer le devis comme validé
            devis.validé = True
            devis.save()

            return JsonResponse({'success': 'Devis validé et converti en facture'}, status=200)
        except Devis.DoesNotExist:
            return JsonResponse({'error': 'Devis introuvable ou déjà validé'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)


@csrf_exempt
def clients_with_details(request):
    try:
        clients = Client_infos.objects.all()
        client_data = []

        for client in clients:
            # Vérifier les conditions de statut
            has_paid_facture = Facture.objects.filter(client=client, status='paid').exists()
            has_draft_devis = Devis.objects.filter(client=client, validé=False).exists()
            has_direct_prestation = Prestation.objects.filter(facture__client=client, facture__status='paid').exists()

            # Déterminer le statut
            if has_paid_facture or has_direct_prestation:
                status = 'Payé'  # Vert
            elif has_draft_devis:
                status = 'Non payé'  # Orange
            else:
                status = 'Aucun devis ou prestation'  # Rouge

            # Calculer le total des factures associées
            total_price = Facture.objects.filter(client=client, status='paid').aggregate(total=Sum('total'))['total'] or 0

            client_data.append({
                'id': client.id,
                'nom': client.nom,
                'prenom': client.prenom,
                'status': status,
                'price': total_price,
                'img': client.img.url if client.img else '/default-avatar.png'
            })

        return JsonResponse(client_data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)



@csrf_exempt
def list_devis(request):
    if request.method == 'GET':
        try:
            devis = Devis.objects.filter(validé=False)  # Récupérer les devis non validés
            devis_data = [
                {
                    'id': d.id,
                    'client_nom': d.client.nom,
                    'client_prenom': d.client.prenom,
                    'total': d.total,
                    'validé': d.validé,
                } for d in devis
            ]
            return JsonResponse(devis_data, safe=False)
        except Exception as e:
            logger.error(f"Erreur lors de la récupération des devis : {str(e)}")
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

@csrf_exempt
def chiffre_affaires_par_mois(request):
    if request.method == 'GET':
        try:
            # Récupérer les factures payées et groupées par mois
            factures_payees = Facture.objects.filter(status='paid')
            data = factures_payees.annotate(
                mois=TruncMonth('date_creation')
            ).values('mois').annotate(
                total_chiffre_affaires=Sum('total')
            ).order_by('mois')

            # Convertir les résultats en un dictionnaire pour les mois existants
            monthly_data = {item['mois'].month: float(item['total_chiffre_affaires']) for item in data}

            # Ajouter les mois manquants avec total=0
            current_year = datetime.now().year
            full_data = []
            for month in range(1, 13):
                full_data.append({
                    "mois": month_name[month],  # Nom du mois
                    "total_chiffre_affaires": monthly_data.get(month, 0.0)  # Utiliser 0.0 si aucune donnée
                })

            return JsonResponse(full_data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

def chiffre_affaires_total(request):
    try:
        # Calculer uniquement pour les factures payées
        total = Facture.objects.filter(status='paid').aggregate(total=Sum('total'))['total'] or 0
        return JsonResponse({'chiffre_affaires_total': float(total)})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# Route pour le total des ventes
@csrf_exempt
def total_ventes(request):
    try:
        total = Facture.objects.filter(status='paid').count()  # Compte les factures payées
        return JsonResponse({'total_ventes': total})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)



# Route pour les clients actifs
@csrf_exempt
def clients_actifs(request):
    if request.method == 'GET':
        try:
            clients_actifs_count = Client_infos.objects.filter(factures__status='paid').distinct().count()
            return JsonResponse({'clients_actifs': clients_actifs_count}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

# Route pour les données du graphique (chiffre d'affaires par mois)
@csrf_exempt
def graphique_chiffre_affaires(request):
    try:
        data = Facture.objects.annotate(
            mois=TruncMonth('date_creation')
        ).values('mois').annotate(
            total=Sum('total')
        ).order_by('mois')

        response_data = [{'mois': entry['mois'].strftime('%Y-%m'), 'total': entry['total']} for entry in data]
        return JsonResponse(response_data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def historique_clients(request):
    if request.method == 'GET':
        try:
            # Récupérer les dernières factures payées avec leurs prestations
            derniers_clients = (
                Facture.objects.filter(status='paid')
                .select_related('client')  # Charger les données des clients
                .prefetch_related('prestations')  # Charger les prestations associées
                .order_by('-date_creation')[:3]
            )

            # Construire la réponse JSON
            data = [
                {
                    'client_nom': facture.client.nom,
                    'client_prenom': facture.client.prenom,
                    'total': facture.total,
                    'date': facture.date_creation,
                    'prestations': [
                        {
                            'service': prestation.service_nom,
                            'prix': prestation.prix,
                            'quantite': prestation.quantite
                        }
                        for prestation in facture.prestations.all()
                    ]
                }
                for facture in derniers_clients
            ]

            return JsonResponse(data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)









