# Generated by Django 3.1.4 on 2021-03-29 13:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tontine', '0002_auto_20210329_1443'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tontine',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tontine.customuser'),
        ),
    ]