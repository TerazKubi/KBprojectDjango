from django.db import models

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=200, default='')
    tags = models.ManyToManyField('Tag', related_name='notes')
    text = models.TextField(default='')

    def __str__(self):
        return str(self.id) + " " + self.title

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name