from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    # path("genre/<int:genre_id>", views.view_genre, name="index"),
    # path("movie/<int:movie_id>", views.view_movie, name="index"),

    path('notes/add', views.addNote, name='save'),
    path('notes/', views.getNotes, name='getNotes'),
    path('notes/edit/<int:note_id>/', views.edit_note, name='editNote'),
    path('notes/delete/<int:note_id>/', views.deleteNote, name='deleteNote')

]