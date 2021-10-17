from django.contrib import admin
from api.models import Pelada


class Peladas(admin.ModelAdmin):
    list_display = ['id', 'nome', 'local']
    list_display_links = ['id', 'nome']
    search_fields = ('nome',)


admin.site.register(Pelada, Peladas)
