# Generated by Django 3.1.4 on 2021-05-26 14:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tontine', '0012_auto_20210526_1342'),
        ('polls', '0003_remove_votingcard_tontine'),
    ]

    operations = [
        migrations.AlterField(
            model_name='election',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='tontine.tontinemember'),
        ),
        migrations.AlterField(
            model_name='votingcard',
            name='asistant_auditor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='voted_ass_auditor', to='tontine.tontinemember'),
        ),
        migrations.AlterField(
            model_name='votingcard',
            name='asistant_secretary',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='voted_ass_ecretery', to='tontine.tontinemember'),
        ),
        migrations.AlterField(
            model_name='votingcard',
            name='auditor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='voted_auditor', to='tontine.tontinemember'),
        ),
        migrations.AlterField(
            model_name='votingcard',
            name='president',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='voted_president', to='tontine.tontinemember'),
        ),
        migrations.AlterField(
            model_name='votingcard',
            name='secretary',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='voted_secretary', to='tontine.tontinemember'),
        ),
        migrations.AlterField(
            model_name='votingcard',
            name='treasurer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='voted_treasurer', to='tontine.tontinemember'),
        ),
        migrations.AlterField(
            model_name='votingcard',
            name='validity',
            field=models.BooleanField(default=True),
        ),
    ]
