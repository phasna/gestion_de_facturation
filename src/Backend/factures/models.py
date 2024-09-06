from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('L\'utilisateur doit avoir une adresse email')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser):
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    siret = models.CharField(max_length=14, unique=True)
    ville = models.CharField(max_length=255)
    tel_mobile = models.CharField(max_length=20)
    tel_fixe = models.CharField(max_length=20, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Nouveau champ pour différencier les clients des admins
    is_client = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nom', 'prenom', 'siret']

    objects = UserManager()

    def __str__(self):
        return self.email


class Document(models.Model):
    nom = models.CharField(max_length=255)
    contenu = models.TextField()
    date_update = models.DateTimeField(auto_now=True)
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')
    type_document = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nom


class Prestation(models.Model):
    service_nom = models.CharField(max_length=255)
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    quantite = models.IntegerField()

    def __str__(self):
        return self.service_nom


class Service(models.Model):
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='services')
    nombre_produit = models.IntegerField()

    def __str__(self):
        return f'Service pour {self.client.nom}'

