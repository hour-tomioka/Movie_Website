from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Movie

@api_view(["GET"])
def movie_list(request):
    movies = Movie.objects.all()

    data = [
        {
        
            'id': movie.id,
            'title': movie.title,
            'overview': movie.overview,
            'poster_url': movie.poster_url,
            'release_date': movie.release_date,
            'rating': movie.rating,
            'tmdb_id': movie.tmdb_id,

        }
        for movie in movies
    ]

    return Response(data)

# Create your views here.
