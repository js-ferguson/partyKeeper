# Generated by Django 3.1.1 on 2020-09-20 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('character', '0003_auto_20200920_0611'),
    ]

    operations = [
        migrations.AddField(
            model_name='character',
            name='hit_dice',
            field=models.IntegerField(default=0),
        ),
    ]
