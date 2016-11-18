from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^cms/', include('subforum.cms.urls')),
    url(r'^', include('subforum.ui.urls')),
    url(r'^admin/', admin.site.urls),
]
