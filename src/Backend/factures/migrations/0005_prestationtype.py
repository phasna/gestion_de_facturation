# Generated by Django 5.1.1 on 2024-09-06 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('factures', '0004_user_is_client'),
    ]

    operations = [
        migrations.CreateModel(
            name='PrestationType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
