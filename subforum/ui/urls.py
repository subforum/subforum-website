from django.conf.urls import include, url
# from rest_framework.authtoken.views import obtain_auth_token
# from rest_framework import routers, serializers, viewsets

from . import views

# router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
# router.register(r'groups', views.GroupViewSet)
# router.register(r'projects', views.ProjectViewSet)
# router.register(r'topics', views.TopicViewSet)
# router.register(r'articles', views.ArticleViewSet)

urlpatterns = [
    # url(r'^api/', include(router.urls)),
    url(r'^$', views.index, name='index'),
    url(r'^topics/$', views.index, name='index'),
    url(r'^topic/(?P<topic_id>\d+)/$', views.index, name='index'),
    url(r'^topic/(?P<topic_id>\d+)/project/(?P<project_id>\d+)/$', views.index, name='index'),
    url(r'^topic/(?P<topic_id>\d+)/project/(?P<project_id>\d+)/article/(?P<article_id>\d+)/$', views.index, name='index'),
    url(r'^topic/(?P<topic_id>\d+)/update/(?P<update_id>\d+)/$', views.index, name='index'),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^api-token-auth/', obtain_auth_token),
]