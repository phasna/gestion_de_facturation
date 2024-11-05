from django.contrib import admin
from .models import Client_infos, Document, Prestation, Service

admin.site.register(Client_infos)
admin.site.register(Document)
admin.site.register(Prestation)
admin.site.register(Service)

