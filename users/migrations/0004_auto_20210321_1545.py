# Generated by Django 3.1.5 on 2021-03-21 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20201220_0908'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='party',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='screen_name',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]
