from django.contrib import admin

# Register your models here.
from subforum.cms.models import Topics, Projects, Articles, Contributors, Contributors_articles, Contributors_projects, Topics_projects

class TopicsProjectsAdmin(admin.TabularInline):
    model = Topics_projects

class ProjectsContributorsAdmin(admin.TabularInline):
    model = Contributors_projects

class ProjectsAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Project Info', {'fields': ['name', 'description', 'edit_date']}),
    ]
    inlines = [TopicsProjectsAdmin, ProjectsContributorsAdmin]


class TopicsAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Topic Info', {'fields': ['name', 'description', 'status', 'create_date', 'image']}),
    ]
    inlines = [TopicsProjectsAdmin]


class ArticlesContributorsAdmin(admin.TabularInline):
    model = Contributors_articles

class ArticlesAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Article Info', {'fields': ['name', 'edit_date']}),
    ]
    inlines = [ArticlesContributorsAdmin]
    

admin.site.register(Topics, TopicsAdmin)
admin.site.register(Projects, ProjectsAdmin)
admin.site.register(Articles, ArticlesAdmin)
admin.site.register(Contributors)
# admin.site.register(Contributors, ContributorsAdmin)
