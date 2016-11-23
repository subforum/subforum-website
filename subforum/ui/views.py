import json
from django.shortcuts import render
from django.http import JsonResponse
from django.forms.models import model_to_dict
# from django.core import serializers
from subforum.cms.models import Topics, Projects, Articles, Topics_projects

# from django.contrib.auth.models import User, Group
# from rest_framework import viewsets
# from subforum.ui.serializers import UserSerializer, GroupSerializer, ProjectSerializer, TopicSerializer, ArticleSerializer

# Create your views here.
def index(request, topic_id = None, project_id = None, article_id = None, update_id = None):
    response_dict = {}

    # subforum_data = Topics.objects.prefetch_related('projects').all()
    # subforum_data = Projects.objects.filter(topics__id=2)
    # subforum_data = serializers.serialize('json', list(subforum_data), fields=('id','name','description'))
    # print(subforum_data)

    topics = Topics.objects.all().prefetch_related('projects')
    # topics_data = serializers.serialize('json', list(topics), fields=('id','name','description','create_date'))
    
    subforum_data = []
    for topic in topics:
        topic_project_data = Projects.objects.filter(topics__id=topic.id)
        # topic_project_data = serializers.serialize('json', list(topic_project_data), fields=('id','name','contributors', 'edit_date'))

        projects = []
        articles = []
        for project in topic_project_data:
            articles_in_project = Articles.objects.filter(project__id=project.id).prefetch_related('project')

            articles2 = []
            for article in articles_in_project:
                articles.append({
                    'id': article.id,    
                    'name': article.name,    
                    'authors': article.authors,    
                    'content': article.content,    
                    'edit_date': article.edit_date.strftime('%b %d, %Y at %-I:%M%p'),
                    'project_name': project.name,
                    'project_id': project.id,
                })

                if(project.id == article.project_id):
                    articles2.append({
                        'id': article.id,    
                        'name': article.name,    
                        'authors': article.authors,    
                        'content': article.content,    
                        'edit_date': article.edit_date.strftime('%b %d, %Y at %-I:%M%p'),    
                    })

            projects.append({
                'id': project.id,    
                'name': project.name,    
                'description': project.description,    
                'contributors': project.contributors,    
                'edit_date': project.edit_date.strftime('%b %d, %Y at %-I:%M%p'),    
                'articles': articles2,    
            })

        subforum_data.append({
            'id': topic.id,
            'name': topic.name,
            'description': topic.description,
            'status': topic.status,
            'create_date': topic.create_date.strftime('%b %d, %Y'),
            'image': str(topic.image),
            'projects': projects,
            'articles': articles,    
        })

    response_dict['subforum_data'] = json.dumps(subforum_data)

    return render(request, 'index.html', response_dict)


# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer


# class GroupViewSet(viewsets.ModelViewSet):
#     queryset = Group.objects.all()
#     serializer_class = GroupSerializer

# class ProjectViewSet(viewsets.ModelViewSet):
#     queryset = Projects.objects.all()
#     serializer_class = ProjectSerializer

# class TopicViewSet(viewsets.ModelViewSet):
#     queryset = Topics.objects.all().prefetch_related('projects')
#     serializer_class = TopicSerializer

# class ArticleViewSet(viewsets.ModelViewSet):
#     queryset = Articles.objects.all()
#     serializer_class = ArticleSerializer