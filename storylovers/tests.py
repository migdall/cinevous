from django.test import TestCase
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from storylovers.models import (
    StoryLover, Film, Rubric, RubricCategory, FilmLog, RubricRating
)


class StoryLoverModelTest(TestCase):
    """Tests for StoryLover model"""
    
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )

    def test_create_story_lover(self):
        """Test creating a story lover profile"""
        story_lover = StoryLover.objects.create(
            user=self.user,
            display_name='Film Enthusiast',
            bio='I love cinema',
            avatar_url='https://example.com/avatar.jpg'
        )
        self.assertEqual(story_lover.display_name, 'Film Enthusiast')
        self.assertEqual(story_lover.bio, 'I love cinema')
        self.assertEqual(str(story_lover), 'Film Enthusiast')

    def test_story_lover_uuid_auto_generated(self):
        """Test that UUID is automatically generated"""
        story_lover = StoryLover.objects.create(
            user=self.user,
            display_name='Test User'
        )
        self.assertIsNotNone(story_lover.id)
        self.assertEqual(len(str(story_lover.id)), 36)  # UUID format

    def test_one_to_one_relationship_with_user(self):
        """Test that StoryLover has one-to-one relationship with User"""
        StoryLover.objects.create(
            user=self.user,
            display_name='First Profile'
        )
        
        # Creating another StoryLover with same user should fail
        with self.assertRaises(IntegrityError):
            StoryLover.objects.create(
                user=self.user,
                display_name='Second Profile'
            )

    def test_optional_social_media_fields(self):
        """Test that social media URLs are optional"""
        story_lover = StoryLover.objects.create(
            user=self.user,
            display_name='Minimal User'
        )
        self.assertEqual(story_lover.website_url, '')
        self.assertEqual(story_lover.youtube_url, '')
        self.assertEqual(story_lover.podcast_url, '')
        self.assertEqual(story_lover.instagram_url, '')

    def test_timestamps_auto_set(self):
        """Test that created_at and updated_at are set automatically"""
        story_lover = StoryLover.objects.create(
            user=self.user,
            display_name='Test'
        )
        self.assertIsNotNone(story_lover.created_at)
        self.assertIsNotNone(story_lover.updated_at)


class FilmModelTest(TestCase):
    """Tests for Film model"""
    
    def test_create_film(self):
        """Test creating a film"""
        film = Film.objects.create(
            title='Past Lives',
            director='Celine Song',
            year=2023,
            genre='Drama',
            country='USA/Korea'
        )
        self.assertEqual(film.title, 'Past Lives')
        self.assertEqual(film.director, 'Celine Song')
        self.assertEqual(str(film), 'Past Lives (2023)')

    def test_decade_auto_populated(self):
        """Test that decade is automatically set from year"""
        film = Film.objects.create(
            title='Inception',
            director='Christopher Nolan',
            year=2010
        )
        self.assertEqual(film.decade, '2010s')
        
        film2 = Film.objects.create(
            title='Pulp Fiction',
            director='Quentin Tarantino',
            year=1994
        )
        self.assertEqual(film2.decade, '1990s')

    def test_tmdb_id_unique(self):
        """Test that TMDB ID must be unique"""
        Film.objects.create(
            title='Film 1',
            director='Director 1',
            year=2023,
            tmdb_id=12345
        )
        
        with self.assertRaises(IntegrityError):
            Film.objects.create(
                title='Film 2',
                director='Director 2',
                year=2023,
                tmdb_id=12345
            )

    def test_tmdb_id_can_be_null(self):
        """Test that TMDB ID can be null for multiple films"""
        film1 = Film.objects.create(
            title='Film 1',
            director='Director 1',
            year=2023,
            tmdb_id=None
        )
        film2 = Film.objects.create(
            title='Film 2',
            director='Director 2',
            year=2023,
            tmdb_id=None
        )
        self.assertIsNone(film1.tmdb_id)
        self.assertIsNone(film2.tmdb_id)

    def test_film_ordering(self):
        """Test that films are ordered by year (desc) then title"""
        Film.objects.create(title='B Movie', director='Director', year=2023)
        Film.objects.create(title='A Movie', director='Director', year=2023)
        Film.objects.create(title='Z Movie', director='Director', year=2024)
        
        films = list(Film.objects.all())
        self.assertEqual(films[0].title, 'Z Movie')  # 2024
        self.assertEqual(films[1].title, 'A Movie')  # 2023, alphabetical
        self.assertEqual(films[2].title, 'B Movie')  # 2023, alphabetical


class RubricModelTest(TestCase):
    """Tests for Rubric model"""
    
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.story_lover = StoryLover.objects.create(
            user=self.user,
            display_name='Test User'
        )

    def test_create_rubric(self):
        """Test creating a rubric"""
        rubric = Rubric.objects.create(
            story_lover=self.story_lover,
            name='Cinephile Standard',
            description='For serious film analysis',
            is_default=True
        )
        self.assertEqual(rubric.name, 'Cinephile Standard')
        self.assertTrue(rubric.is_default)
        self.assertIn('Cinephile Standard', str(rubric))

    def test_only_one_default_rubric_per_story_lover(self):
        """Test that only one rubric can be default per story lover"""
        rubric1 = Rubric.objects.create(
            story_lover=self.story_lover,
            name='First Rubric',
            is_default=True
        )
        self.assertTrue(rubric1.is_default)
        
        rubric2 = Rubric.objects.create(
            story_lover=self.story_lover,
            name='Second Rubric',
            is_default=True
        )
        
        # Refresh rubric1 from database
        rubric1.refresh_from_db()
        self.assertFalse(rubric1.is_default)
        self.assertTrue(rubric2.is_default)

    def test_unique_rubric_name_per_story_lover(self):
        """Test that rubric names must be unique per story lover"""
        Rubric.objects.create(
            story_lover=self.story_lover,
            name='My Rubric'
        )
        
        with self.assertRaises(IntegrityError):
            Rubric.objects.create(
                story_lover=self.story_lover,
                name='My Rubric'
            )

    def test_different_story_lovers_can_have_same_rubric_name(self):
        """Test that different story lovers can use the same rubric name"""
        user2 = User.objects.create_user(username='user2', password='testpass123')
        story_lover2 = StoryLover.objects.create(
            user=user2,
            display_name='User 2'
        )
        
        Rubric.objects.create(story_lover=self.story_lover, name='Standard')
        Rubric.objects.create(story_lover=story_lover2, name='Standard')
        
        self.assertEqual(Rubric.objects.filter(name='Standard').count(), 2)

    def test_total_weight_property(self):
        """Test total_weight property calculation"""
        rubric = Rubric.objects.create(
            story_lover=self.story_lover,
            name='Test Rubric'
        )
        RubricCategory.objects.create(rubric=rubric, name='Direction', weight=30)
        RubricCategory.objects.create(rubric=rubric, name='Acting', weight=40)
        RubricCategory.objects.create(rubric=rubric, name='Story', weight=30)
        
        self.assertEqual(rubric.total_weight, 100)

    def test_is_valid_property(self):
        """Test is_valid property returns True when weight is 100"""
        rubric = Rubric.objects.create(
            story_lover=self.story_lover,
            name='Valid Rubric'
        )
        RubricCategory.objects.create(rubric=rubric, name='Cat1', weight=50)
        RubricCategory.objects.create(rubric=rubric, name='Cat2', weight=50)
        
        self.assertTrue(rubric.is_valid)
        
        # Add another category making it invalid
        RubricCategory.objects.create(rubric=rubric, name='Cat3', weight=10)
        self.assertFalse(rubric.is_valid)


class RubricCategoryModelTest(TestCase):
    """Tests for RubricCategory model"""
    
    def setUp(self):
        user = User.objects.create_user(username='testuser', password='testpass123')
        story_lover = StoryLover.objects.create(user=user, display_name='Test')
        self.rubric = Rubric.objects.create(
            story_lover=story_lover,
            name='Test Rubric'
        )

    def test_create_category(self):
        """Test creating a rubric category"""
        category = RubricCategory.objects.create(
            rubric=self.rubric,
            name='Direction',
            weight=25,
            order=1
        )
        self.assertEqual(category.name, 'Direction')
        self.assertEqual(category.weight, 25)
        self.assertIn('Direction', str(category))
        self.assertIn('25%', str(category))

    def test_weight_validation_min(self):
        """Test that weight must be at least 5"""
        category = RubricCategory(
            rubric=self.rubric,
            name='Test',
            weight=3  # Less than minimum
        )
        with self.assertRaises(ValidationError):
            category.full_clean()

    def test_weight_validation_max(self):
        """Test that weight must be at most 50"""
        category = RubricCategory(
            rubric=self.rubric,
            name='Test',
            weight=60  # More than maximum
        )
        with self.assertRaises(ValidationError):
            category.full_clean()

    def test_weight_validation_valid(self):
        """Test that valid weights pass validation"""
        category = RubricCategory(
            rubric=self.rubric,
            name='Test',
            weight=25
        )
        category.full_clean()  # Should not raise

    def test_unique_category_name_per_rubric(self):
        """Test that category names must be unique within a rubric"""
        RubricCategory.objects.create(
            rubric=self.rubric,
            name='Direction',
            weight=25
        )
        
        with self.assertRaises(IntegrityError):
            RubricCategory.objects.create(
                rubric=self.rubric,
                name='Direction',
                weight=30
            )

    def test_category_ordering(self):
        """Test that categories are ordered by order field then id"""
        cat3 = RubricCategory.objects.create(rubric=self.rubric, name='C', weight=20, order=2)
        cat1 = RubricCategory.objects.create(rubric=self.rubric, name='A', weight=30, order=0)
        cat2 = RubricCategory.objects.create(rubric=self.rubric, name='B', weight=50, order=1)
        
        categories = list(self.rubric.categories.all())
        self.assertEqual(categories[0], cat1)  # order=0
        self.assertEqual(categories[1], cat2)  # order=1
        self.assertEqual(categories[2], cat3)  # order=2


class FilmLogModelTest(TestCase):
    """Tests for FilmLog model"""
    
    def setUp(self):
        user = User.objects.create_user(username='testuser', password='testpass123')
        self.story_lover = StoryLover.objects.create(
            user=user,
            display_name='Test User'
        )
        self.film = Film.objects.create(
            title='Test Film',
            director='Test Director',
            year=2023
        )

    def test_create_film_log(self):
        """Test creating a film log"""
        log = FilmLog.objects.create(
            story_lover=self.story_lover,
            film=self.film,
            rating=9,
            review='Amazing film!',
            mood='joyful'
        )
        self.assertEqual(log.rating, 9)
        self.assertEqual(log.mood, 'joyful')
        self.assertFalse(log.is_rewatch)

    def test_film_log_uuid_auto_generated(self):
        """Test that UUID is automatically generated"""
        log = FilmLog.objects.create(
            story_lover=self.story_lover,
            film=self.film
        )
        self.assertIsNotNone(log.id)
        self.assertEqual(len(str(log.id)), 36)

    def test_rating_validation(self):
        """Test that rating must be between 1 and 10"""
        log = FilmLog(
            story_lover=self.story_lover,
            film=self.film,
            rating=11
        )
        with self.assertRaises(ValidationError):
            log.full_clean()
        
        log.rating = 0
        with self.assertRaises(ValidationError):
            log.full_clean()
        
        log.rating = 5
        log.full_clean()  # Should not raise

    def test_optional_rating(self):
        """Test that rating can be null"""
        log = FilmLog.objects.create(
            story_lover=self.story_lover,
            film=self.film,
            rating=None
        )
        self.assertIsNone(log.rating)

    def test_is_new_director_detection(self):
        """Test automatic detection of new directors"""
        film1 = Film.objects.create(
            title='Film 1',
            director='Christopher Nolan',
            year=2020
        )
        film2 = Film.objects.create(
            title='Film 2',
            director='Christopher Nolan',
            year=2021
        )
        film3 = Film.objects.create(
            title='Film 3',
            director='Denis Villeneuve',
            year=2021
        )
        
        # First log should be a new director
        log1 = FilmLog.objects.create(
            story_lover=self.story_lover,
            film=film1
        )
        self.assertTrue(log1.is_new_director)
        
        # Second log with same director should not be new
        log2 = FilmLog.objects.create(
            story_lover=self.story_lover,
            film=film2
        )
        self.assertFalse(log2.is_new_director)
        
        # Different director should be new
        log3 = FilmLog.objects.create(
            story_lover=self.story_lover,
            film=film3
        )
        self.assertTrue(log3.is_new_director)

    def test_is_rewatch_detection(self):
        """Test automatic detection of rewatches"""
        # First watch
        log1 = FilmLog.objects.create(
            story_lover=self.story_lover,
            film=self.film
        )
        self.assertFalse(log1.is_rewatch)
        
        # Second watch should be a rewatch
        log2 = FilmLog.objects.create(
            story_lover=self.story_lover,
            film=self.film
        )
        self.assertTrue(log2.is_rewatch)

    def test_weighted_score_calculation(self):
        """Test weighted score calculation from rubric ratings"""
        rubric = Rubric.objects.create(
            story_lover=self.story_lover,
            name='Test Rubric'
        )
        cat1 = RubricCategory.objects.create(
            rubric=rubric,
            name='Direction',
            weight=40
        )
        cat2 = RubricCategory.objects.create(
            rubric=rubric,
            name='Acting',
            weight=30
        )
        
        log = FilmLog.objects.create(
            story_lover=self.story_lover,
            film=self.film
        )
        
        RubricRating.objects.create(film_log=log, category=cat1, rating=10)
        RubricRating.objects.create(film_log=log, category=cat2, rating=8)
        
        # Weighted score = (10 * 40 + 8 * 30) / (40 + 30) = (400 + 240) / 70 = 640 / 70 ≈ 9.1
        score = log.weighted_score
        self.assertIsNotNone(score)
        self.assertAlmostEqual(score, 9.1, places=1)

    def test_weighted_score_no_ratings(self):
        """Test that weighted_score returns None when no rubric ratings"""
        log = FilmLog.objects.create(
            story_lover=self.story_lover,
            film=self.film
        )
        self.assertIsNone(log.weighted_score)


class RubricRatingModelTest(TestCase):
    """Tests for RubricRating model"""
    
    def setUp(self):
        user = User.objects.create_user(username='testuser', password='testpass123')
        story_lover = StoryLover.objects.create(user=user, display_name='Test')
        rubric = Rubric.objects.create(story_lover=story_lover, name='Test Rubric')
        self.category = RubricCategory.objects.create(
            rubric=rubric,
            name='Direction',
            weight=30
        )
        film = Film.objects.create(
            title='Test Film',
            director='Director',
            year=2023
        )
        self.film_log = FilmLog.objects.create(
            story_lover=story_lover,
            film=film
        )

    def test_create_rubric_rating(self):
        """Test creating a rubric rating"""
        rating = RubricRating.objects.create(
            film_log=self.film_log,
            category=self.category,
            rating=8
        )
        self.assertEqual(rating.rating, 8)
        self.assertIn('Direction', str(rating))
        self.assertIn('8', str(rating))

    def test_rating_validation(self):
        """Test that rating must be between 1 and 10"""
        rating = RubricRating(
            film_log=self.film_log,
            category=self.category,
            rating=15
        )
        with self.assertRaises(ValidationError):
            rating.full_clean()
        
        rating.rating = 0
        with self.assertRaises(ValidationError):
            rating.full_clean()
        
        rating.rating = 7
        rating.full_clean()  # Should not raise

    def test_unique_rating_per_film_log_category(self):
        """Test that only one rating per film log and category"""
        RubricRating.objects.create(
            film_log=self.film_log,
            category=self.category,
            rating=7
        )
        
        with self.assertRaises(IntegrityError):
            RubricRating.objects.create(
                film_log=self.film_log,
                category=self.category,
                rating=9
            )
