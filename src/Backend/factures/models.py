from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

# Manager pour la table Connection
class ConnectionManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("L'utilisateur doit avoir une adresse email")
        if not username:
            raise ValueError("L'utilisateur doit avoir un nom d'utilisateur")

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)

class Connection(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = ConnectionManager()

    def __str__(self):
        return self.username

class Client_infos(models.Model):
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    siret = models.CharField(max_length=14, unique=True)
    ville = models.CharField(max_length=255)
    tel_mobile = models.CharField(max_length=20)
    tel_fixe = models.CharField(max_length=20, blank=True, null=True)
    img = models.ImageField(upload_to='clients/', default='default-avatar.png', blank=True)

    # Champs supplémentaires
    adresse = models.CharField(max_length=255, blank=True, null=True)  # Champ optionnel pour l'adresse
    code_postal = models.CharField(max_length=10, blank=True, null=True)  # Champ optionnel pour le code postal

    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('client', 'Client'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='client')
    poste_occupe = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.nom} {self.prenom} - {self.email}"

    class Meta:
        verbose_name = "Client"
        verbose_name_plural = "Clients"

class Facture(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Brouillon'),
        ('paid', 'Payée'),
        ('cancelled', 'Annulée'),
    ]

    client = models.ForeignKey('Client_infos', on_delete=models.CASCADE, related_name='factures')
    date_creation = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')  # Nouveau champ pour le statut

    def __str__(self):
        return f"Facture {self.id} - Client: {self.client.nom} - Statut: {self.get_status_display()}"  # Affiche le statut lisible

    class Meta:
        indexes = [models.Index(fields=['date_creation'])]  # Ajout d'un index sur la date

class Document(models.Model):
    nom = models.CharField(max_length=255)
    contenu = models.TextField()
    date_update = models.DateTimeField(auto_now=True)
    client = models.ForeignKey(Client_infos, on_delete=models.CASCADE, related_name='documents')
    facture = models.ForeignKey(Facture, on_delete=models.CASCADE, related_name='documents', null=True, blank=True)
    type_document = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nom

class Prestation(models.Model):
    service_nom = models.CharField(max_length=255)
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    quantite = models.IntegerField()
    facture = models.ForeignKey(Facture, on_delete=models.CASCADE, related_name='prestations', null=True, blank=True)
    devis = models.ForeignKey('Devis', on_delete=models.CASCADE, related_name='prestations', null=True, blank=True)  # Utilisez une chaîne

    def __str__(self):
        return self.service_nom



class Service(models.Model):
    client = models.ForeignKey(Client_infos, on_delete=models.CASCADE, related_name='services')
    nombre_produit = models.IntegerField()

    def __str__(self):
        return f"Service pour {self.client.nom}"

class PrestationType(models.Model):
    nom = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    prix = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.nom

class Poste(models.Model):
    nom_poste = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nom_poste


class Devis(models.Model):
    client = models.ForeignKey(Client_infos, on_delete=models.CASCADE, related_name='devis')
    date_creation = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    validé = models.BooleanField(default=False)  # Indique si le devis est validé ou non

    def __str__(self):
        return f"Devis {self.id} pour {self.client.nom}"



