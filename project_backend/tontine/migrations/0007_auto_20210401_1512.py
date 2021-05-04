# Generated by Django 3.1.4 on 2021-04-01 14:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tontine', '0006_auto_20210401_1504'),
    ]

    operations = [
        migrations.AlterField(
            model_name='requests',
            name='sent_from',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='requests',
            name='tontine',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tontine.tontine'),
        ),
    ]