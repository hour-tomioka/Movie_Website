from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=255)
    overview = models.TextField(blank=True)
    poster_url = models.URLField(blank=True)
    release_date = models.DateField(null=True, blank=True)
    rating = models.FloatField(default=0)
    tmdb_id = models.IntegerField(unique=True)

    def __str__(self):
        return self.title