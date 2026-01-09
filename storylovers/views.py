import logging
import json
from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from .models import FilmLog, StoryLover, Film


@method_decorator([login_required, csrf_protect], name='dispatch')
class FilmLogView(View):
    def get(self, request):
        if request.method == 'GET':
            story_lover = StoryLover.objects.get(id=request.user.story_lover.id)
            if not story_lover:
                logging.error("StoryLover not found for user ID: %s", request.user.id)
                return JsonResponse({'error': 'User not found.'}, status=404)
            
            film_logs = FilmLog.objects.filter(story_lover=story_lover).select_related('film').order_by('-watched_at')
            logs_data = []
            for log in film_logs:
                logs_data.append({
                    'id': log.id,
                    'title': log.film.title,
                    'rating': log.rating,
                    'review': log.review,
                    'mood': log.mood,
                    'watched_at': log.watched_at,
                    'country': log.film.country,
                    'director': log.film.director,
                    'year': log.film.year,
                })
            return JsonResponse({'film_logs': logs_data}, status=200)
    
    def post(self, request):
        if request.method == 'POST':
            story_lover = StoryLover.objects.get(id=request.user.story_lover.id)
            if not story_lover:
                logging.error("StoryLover not found for user ID: %s", request.user.id)
                return JsonResponse({'error': 'User not found.'}, status=404)
            
            data = json.loads(request.body)

            try:
                film_id = data['film_id']
                # film_id = 1  # Temporary hardcoded value
                rating_num = data['rating']
                review_text = data.get('review', '')
                mood = data.get('mood', '')
            except KeyError as e:
                logging.error(f"Missing data in film log creation: {e}")
                return JsonResponse({'error': f'Missing data.'}, status=400)
            
            try:
                film = Film.objects.get(id=film_id)
            except Film.DoesNotExist:
                logging.error("Film not found with ID: %s", film_id)
                return JsonResponse({'error': 'Film not found.'}, status=404)
            
            try:
                rating = int(rating_num)
                if rating < 1 or rating > 10:
                    raise ValueError("Rating out of bounds")
            except (ValueError, TypeError) as e:
                logging.error(f"Invalid rating value: {rating_num}. Error: {e}")
                return JsonResponse({'error': 'Invalid rating value.'}, status=400)
            
            new_film_log = FilmLog.objects.create(
                story_lover=story_lover,
                film=film,
                rating=rating,
                review=review_text,
                mood=mood
            )
            return JsonResponse({'status': 'success', 'id': new_film_log.id, 'watched_at': new_film_log.watched_at}, status=201)
    
    def put(self, request):
        # Example PUT handler if needed
        return JsonResponse({'status': 'PUT not implemented'}, status=501)  
    
    def delete(self, request):
        # Example DELETE handler if needed
        return JsonResponse({'status': 'DELETE not implemented'}, status=501)   

@method_decorator([login_required, csrf_protect], name='dispatch')
class FilmView(View):
    def get(self, request, q=''):
        if request.method == 'GET':
            try:
                films = Film.objects.filter(title__icontains=q)
            except Exception as e:
                logging.error("Film not found with ID: %s", e)
                return JsonResponse({'error': 'Film not found.'}, status=404)
            
            response_data = []
            for film in films:
                response_data.append({
                    'id': film.id,
                    'title': film.title,
                    'director': film.director,
                    'country': film.country,
                    'year': film.year,
                    'genre': film.genre,
                    'decade': film.decade,
                })
            return JsonResponse({'films': response_data}, status=200)
