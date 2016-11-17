from django.contrib import admin

# Register your models here.
from subforum.cms.models import Topics, Projects, Articles, Topics_projects

class TopicsProjectsAdmin(admin.TabularInline):
    model = Topics_projects

class ProjectsAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Project Info', {'fields': ['name', 'description', 'contributors', 'edit_date']}),
    ]
    inlines = [TopicsProjectsAdmin]


class TopicsAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Topic Info', {'fields': ['name', 'description', 'status', 'create_date', 'image']}),
    ]
    inlines = [TopicsProjectsAdmin]

admin.site.register(Topics, TopicsAdmin)
admin.site.register(Projects, ProjectsAdmin)
admin.site.register(Articles)
