import logging
import json
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from .models import FilmLog, StoryLover, Film


@login_required
@csrf_protect
def film_log_create(request):
    if request.method == 'POST':
        story_lover = StoryLover.objects.get(id=request.user.story_lover.id)
        if not story_lover:
            logging.error("StoryLover not found for user ID: %s", request.user.id)
            return JsonResponse({'error': 'User not found.'}, status=404)
        
        data = json.loads(request.body)

        try:
            # TODO film_id = data['film_id']
            film_id = 1  # Temporary hardcoded value
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
