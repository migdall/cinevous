import uuid
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class StoryLover(models.Model):
    """
    Represents an app user separately from the auth User model.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='story_lover')
    display_name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    avatar_url = models.URLField(blank=True)
    website_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    podcast_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "storylovers"

    def __str__(self):
        return self.display_name


class StoryLocation(models.Model):
    """
    Represents a location whether real or fictional that is in a story.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name


class FilmGenre(models.Model):
    """
    Represents a type of film genre.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class FilmCountry(models.Model):
    """
    Represents a country where a film's creative team, producer, studio, distributor, or funding origin is based.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ['name']
        verbose_name_plural = 'Film Countries'

    def __str__(self):
        return self.name


class FilmDirector(models.Model):
    """
    Represents a film director.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Film(models.Model):
    """
    Represents a film in the database.
    This could be populated from an external API like TMDB or manually.
    """
    title = models.CharField(max_length=255)
    year = models.PositiveIntegerField()
    decade = models.CharField(max_length=10, blank=True)  # e.g., "2020s"
    tmdb_id = models.PositiveIntegerField(null=True, blank=True, unique=True)
    poster_url = models.URLField(blank=True)
    
    # Many-to-many relationships
    directors = models.ManyToManyField(FilmDirector, related_name='films', blank=True)
    genres = models.ManyToManyField(FilmGenre, related_name='films', blank=True)
    countries = models.ManyToManyField(FilmCountry, related_name='films', blank=True)
    story_locations = models.ManyToManyField(StoryLocation, related_name='films', blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-year', 'title']
        indexes = [
            models.Index(fields=['title']),
            models.Index(fields=['year']),
        ]

    def __str__(self):
        return f"{self.title} ({self.year})"

    def save(self, *args, **kwargs):
        # Auto-populate decade from year
        if self.year:
            self.decade = f"{(self.year // 10) * 10}s"
        super().save(*args, **kwargs)
    
    def get_directors_display(self):
        """Return comma-separated list of directors"""
        return ', '.join([d.name for d in self.directors.all()]) or self.director
    
    def get_genres_display(self):
        """Return comma-separated list of genres"""
        return ', '.join([g.name for g in self.genres.all()]) or self.genre
    
    def get_countries_display(self):
        """Return comma-separated list of countries"""
        return ', '.join([c.name for c in self.countries.all()]) or self.country
    
    def get_story_locations_display(self):
        """Return comma-separated list of story locations"""
        return ', '.join([sl.name for sl in self.story_locations.all()])


class Rubric(models.Model):
    """
    A custom rating rubric created by a story_lover.
    Contains weighted categories for rating films.
    """
    story_lover = models.ForeignKey(StoryLover, on_delete=models.CASCADE, related_name='rubrics')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    is_default = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_default', 'name']
        unique_together = ['story_lover', 'name']

    def __str__(self):
        return f"{self.name} ({self.story_lover.display_name})"

    def save(self, *args, **kwargs):
        # Ensure only one default rubric per story_lover
        if self.is_default:
            Rubric.objects.filter(story_lover=self.story_lover, is_default=True).update(is_default=False)
        super().save(*args, **kwargs)

    @property
    def total_weight(self):
        return self.categories.aggregate(total=models.Sum('weight'))['total'] or 0

    @property
    def is_valid(self):
        return self.total_weight == 100


class RubricCategory(models.Model):
    """
    A single category within a rubric (e.g., "Cinematography", "Direction").
    """
    rubric = models.ForeignKey(Rubric, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=100)
    weight = models.PositiveIntegerField(
        validators=[MinValueValidator(5), MaxValueValidator(50)],
        help_text="Weight as percentage (5-50). All categories should sum to 100."
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        unique_together = ['rubric', 'name']

    def __str__(self):
        return f"{self.name} ({self.weight}%)"


class FilmLog(models.Model):
    """
    A story lover's log entry for a film they've watched.
    Contains rating, review, mood, and timestamp.
    """
    MOOD_CHOICES = [
        ('warm', 'Warm'),
        ('melancholy', 'Melancholy'),
        ('thrilled', 'Thrilled'),
        ('reflective', 'Reflective'),
        ('joyful', 'Joyful'),
        ('unsettled', 'Unsettled'),
        ('dreamy', 'Dreamy'),
        ('profound', 'Profound'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    story_lover = models.ForeignKey(StoryLover, on_delete=models.CASCADE, related_name='film_logs')
    film = models.ForeignKey(Film, on_delete=models.CASCADE, related_name='logs')
    
    # Basic rating (1-10)
    rating = models.PositiveIntegerField(
        null=True, 
        blank=True,
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    
    # Review text
    review = models.TextField(blank=True)
    
    # Mood when watching
    mood = models.CharField(max_length=20, choices=MOOD_CHOICES, blank=True)
    
    # Tracking for stats
    watched_at = models.DateTimeField(auto_now_add=True)
    is_new_director = models.BooleanField(default=False)
    is_rewatch = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-watched_at']
        indexes = [
            models.Index(fields=['story_lover', '-watched_at']),
            models.Index(fields=['story_lover', 'film']),
        ]

    def __str__(self):
        return f"{self.story_lover.display_name} - {self.film.title}"

    def save(self, *args, **kwargs):
        # Check if this is a new entry (not yet in database)
        is_new = self._state.adding
        
        if is_new:
            # Check if this is a new director for the story_lover
            existing_directors = FilmLog.objects.filter(
                story_lover=self.story_lover
            ).values_list('film__directors', flat=True).distinct()
            for director in self.film.directors.values_list():
                self.is_new_director = director[0] not in existing_directors
            
            # Check if rewatch
            self.is_rewatch = FilmLog.objects.filter(
                story_lover=self.story_lover, 
                film=self.film
            ).exists()
        
        super().save(*args, **kwargs)

    @property
    def weighted_score(self):
        """Calculate weighted score from rubric ratings."""
        rubric_ratings = self.rubric_ratings.select_related('category__rubric').all()
        
        if not rubric_ratings:
            return None
        
        # Group by rubric
        rubric_scores = {}
        for rr in rubric_ratings:
            rubric_id = rr.category.rubric_id
            if rubric_id not in rubric_scores:
                rubric_scores[rubric_id] = {
                    'total_weighted': 0,
                    'total_weight': 0
                }
            rubric_scores[rubric_id]['total_weighted'] += rr.rating * rr.category.weight
            rubric_scores[rubric_id]['total_weight'] += rr.category.weight
        
        # Return first rubric's score (or could return all)
        for rubric_id, data in rubric_scores.items():
            if data['total_weight'] > 0:
                return round(data['total_weighted'] / data['total_weight'], 1)
        
        return None


class RubricRating(models.Model):
    """
    A rating for a specific category within a rubric for a film log.
    Links FilmLog to RubricCategory with a score.
    """
    film_log = models.ForeignKey(FilmLog, on_delete=models.CASCADE, related_name='rubric_ratings')
    category = models.ForeignKey(RubricCategory, on_delete=models.CASCADE, related_name='ratings')
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )

    class Meta:
        unique_together = ['film_log', 'category']

    def __str__(self):
        return f"{self.film_log.film.title} - {self.category.name}: {self.rating}"
