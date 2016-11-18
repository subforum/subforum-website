from django.contrib.auth.models import User, Group
from rest_framework import serializers
from subforum.cms.models import Topics, Projects, Articles


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Projects
        fields = ('id', 'name', 'description', 'contributors', 'edit_date')


class TopicSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Topics
        fields = ('id', 'name', 'description', 'status', 'create_date', 'image', 'projects')


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Articles
        fields = ('id', 'name', 'authors', 'edit_date', 'content', 'project')



# class Topics_projects(models.Model):
#     topic = models.ForeignKey(Topics, on_delete=models.CASCADE)
#     project = models.ForeignKey(Projects, on_delete=models.CASCADE)

#     class Meta:
#         db_table = 'Topics_projects'

#     def __str__(self):
#         return self.topic.name + ' - ' + self.project.name 