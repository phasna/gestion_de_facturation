# Generated by Django 5.1.1 on 2024-09-06 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('factures', '0003_prestation_document_service'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_client',
            field=models.BooleanField(default=True),
        ),
    ]
