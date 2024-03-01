# Generated by Django 5.0 on 2024-03-01 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Label',
            fields=[
                ('name', models.CharField(max_length=50)),
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Attraction',
            fields=[
                ('attraction_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('price', models.IntegerField()),
                ('rating', models.IntegerField()),
                ('date_created', models.DateField(auto_now_add=True)),
                ('food_description', models.TextField(default='')),
                ('housing_description', models.TextField(default='')),
                ('activity_description', models.TextField(default='')),
                ('labels', models.ManyToManyField(to='attractions_api.label')),
            ],
        ),
    ]
