from django.contrib import admin
from .models import User, Document, Prestation, Service

admin.site.register(User)
admin.site.register(Document)
admin.site.register(Prestation)
admin.site.register(Service)

