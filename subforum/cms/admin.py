from django.contrib import admin

# Register your models here.
from subforum.cms.models import Topics, Projects, Articles, Topics_projects

admin.site.register(Topics)
admin.site.register(Projects)
admin.site.register(Articles)
admin.site.register(Topics_projects)