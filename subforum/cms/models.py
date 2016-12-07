from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Contributors(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    status = models.CharField(max_length=100, default='member')
    active = models.SmallIntegerField(default=1)
    image = models.ImageField(upload_to='uploads/team/', default='')

    class Meta:
        db_table = 'Contributors'

    def __str__(self):
        return self.first_name + ' ' + self.last_name

    def as_dict(self):
        context = {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'status': self.status,
            'active': self.active,
            'image': str(self.image),
        }

        return context


class Projects(models.Model):
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=500, default='')
    edit_date = models.DateTimeField('date edited')
    leads = models.ManyToManyField(
        Contributors,
        through='Contributors_projects',
        through_fields=('project', 'contributor'),
    )

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
    edit_date = models.DateTimeField('date edited')
    content = models.TextField(max_length=50000, default='')
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    authors = models.ManyToManyField(
        Contributors,
        through='Contributors_articles',
        through_fields=('article', 'contributor'),
    )

    class Meta:
        db_table = 'Articles'

    def __str__(self):
        return self.name


class Contributors_articles(models.Model):
    contributor = models.ForeignKey(Contributors, on_delete=models.CASCADE)
    article = models.ForeignKey(Articles, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Contributors_articles'

    def __str__(self):
        return self.article.name + ' - ' + self.contributor.first_name + ' - ' + self.contributor.last_name

class Contributors_projects(models.Model):
    contributor = models.ForeignKey(Contributors, on_delete=models.CASCADE)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Contributors_projects'

    def __str__(self):
        return self.project.name + ' - ' + self.contributor.first_name + ' - ' + self.contributor.last_name