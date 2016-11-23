from django.conf.urls import include, url
from django.contrib import admin

# For development only
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    url(r'^cms/', include('subforum.cms.urls')),
    url(r'^', include('subforum.ui.urls')),
    url(r'^admin/', admin.site.urls),
]

# For development only
urlpatterns += staticfiles_urlpatterns()