# Generated by Django 5.1.1 on 2024-11-14 16:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('factures', '0004_client_infos_img'),
    ]

    operations = [
        migrations.CreateModel(
            name='Devis',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_creation', models.DateTimeField(auto_now_add=True)),
                ('total', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('validé', models.BooleanField(default=False)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='devis', to='factures.client_infos')),
            ],
        ),
    ]
