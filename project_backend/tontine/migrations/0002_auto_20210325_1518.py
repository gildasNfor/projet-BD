# Generated by Django 3.1.4 on 2021-03-25 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tontine', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='birth_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
