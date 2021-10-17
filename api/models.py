from django.db import models


class Pelada(models.Model):
    nome = models.CharField(max_length=50)
    local = models.TextField(max_length=300)

    def __str__(self):
        return self.nome
