from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Projects(models.Model):
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=500, default='')
    contributors = models.CharField(max_length=200)
    edit_date = models.DateTimeField('date edited')

    class Meta:
        db_table = 'Projects'

    def __str__(self):
        return self.name


class Topics(models.Model):
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    status = models.CharField(max_length=150, default='')
    create_date = models.DateField('date created')
    image = models.ImageField(upload_to='uploads/')
    projects = models.ManyToManyField(
        Projects,
        through='Topics_projects',
        through_fields=('topic', 'project'),
    )

    class Meta:
        db_table = 'Topics'

    def __str__(self):
        return self.name


class Topics_projects(models.Model):
    topic = models.ForeignKey(Topics, on_delete=models.CASCADE)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Topics_projects'

    def __str__(self):
        return self.topic.name + ' - ' + self.project.name 


class Articles(models.Model):
    name = models.CharField(max_length=150)
    authors = models.CharField(max_length=200)
    edit_date = models.DateTimeField('date edited')
    content = models.CharField(max_length=1000, default='')
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Articles'

    def __str__(self):
        return self.name