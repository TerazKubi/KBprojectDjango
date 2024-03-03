from django.forms import model_to_dict
from django.shortcuts import redirect, render
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from django.template import loader
from django.db.models import Q
import json
from .models import Note, Tag

# Create your views here.
def index(request : HttpRequest):
    
    template = loader.get_template('zabkaKB/index.html')

    return HttpResponse(template.render())


@require_http_methods(["POST"])
def addNote(request):
    print('save note')
    if request.method == 'POST':
        data = request.body.decode("utf-8")
        json_data = json.loads(data)
        new_note = Note.objects.create(
            title=json_data['title'],
            text=json_data['text']
        )

        for tag_name in json_data['tags']:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            new_note.tags.add(tag)

        new_note.save()
        return JsonResponse({'message': "Successfuly created"}, status=201)

    return JsonResponse({'message': 'Invalid method'}, status=405)


@require_http_methods(["GET"])
def getNotes(request):
    if request.method == 'GET':
        search = request.GET.get('search')

        if search:
            notes = Note.objects.filter(
                Q(title__icontains=search) | Q(tags__name__icontains=search)
            ).distinct()
        else:
            notes = Note.objects.all()
        
        notes_data = [
            {
                'id': note.id,
                'title': note.title,
                'tags': [tag.name for tag in note.tags.all()],
                'text': note.text,
            }
            for note in notes
        ]

        return JsonResponse({'notes': notes_data}, status=200, safe=False)
    else:
        return JsonResponse({'error': 'Invalid method'}, status=405)


@require_http_methods(["PUT"])
def edit_note(request, note_id):
    print("note id:", str(note_id))
    try:
        
        
        if request.method == 'PUT':
            note = get_object_or_404(Note, id=note_id)
            print(note)

            data = json.loads(request.body.decode("utf-8"))
            print(data)
            
            note.title = data.get('title', note.title)
            note.text = data.get('text', note.text)

            
            note.tags.clear()
            for tag_name in data.get('tags', []):
                tag, created = Tag.objects.get_or_create(name=tag_name)
                note.tags.add(tag)

            
            note.save()

            return JsonResponse({'message': f'Note with ID {note_id} edited successfully'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid method'}, status=405)

    except Exception as e:
        # print(str(e))
        return JsonResponse({'error': f'Error editing note: {str(e)}'}, status=500)


@require_http_methods(["DELETE"])
def deleteNote(request, note_id):
    try:
        # Retrieve the note by ID
        note = get_object_or_404(Note, id=note_id)

        # Delete the note
        note.delete()

        return JsonResponse({'message': f'Note with ID {note_id} deleted successfully'}, status=200)
    except Exception as e:
        return JsonResponse({'error': f'Error deleting note: {str(e)}'}, status=500)