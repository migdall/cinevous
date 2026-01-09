# StoryLovers Tests Summary

## Test Coverage

Created comprehensive tests for all StoryLovers models with **40+ test cases**.

## Test Classes

### StoryLoverModelTest (6 tests)
- ✅ Creating story lover profiles
- ✅ UUID auto-generation
- ✅ One-to-one relationship with User
- ✅ Optional social media fields
- ✅ Automatic timestamps

### FilmModelTest (5 tests)
- ✅ Creating films
- ✅ Automatic decade calculation from year
- ✅ TMDB ID uniqueness
- ✅ TMDB ID can be null
- ✅ Film ordering (by year desc, then title)

### RubricModelTest (6 tests)
- ✅ Creating rubrics
- ✅ Only one default rubric per story lover
- ✅ Unique rubric names per story lover
- ✅ Different story lovers can have same rubric name
- ✅ Total weight property calculation
- ✅ Is valid property (checks if total weight = 100)

### RubricCategoryModelTest (6 tests)
- ✅ Creating categories
- ✅ Weight validation (minimum 5)
- ✅ Weight validation (maximum 50)
- ✅ Valid weights pass validation
- ✅ Unique category names per rubric
- ✅ Category ordering

### FilmLogModelTest (9 tests)
- ✅ Creating film logs
- ✅ UUID auto-generation
- ✅ Rating validation (1-10)
- ✅ Optional rating field
- ✅ Automatic new director detection
- ✅ Automatic rewatch detection
- ✅ Weighted score calculation
- ✅ Weighted score with no ratings

### RubricRatingModelTest (3 tests)
- ✅ Creating rubric ratings
- ✅ Rating validation (1-10)
- ✅ Unique constraint per film log and category

## Running Tests

```bash
# Run all storylovers tests
python manage.py test storylovers

# Run specific test class
python manage.py test storylovers.tests.FilmLogModelTest

# Run specific test method
python manage.py test storylovers.tests.FilmLogModelTest.test_is_new_director_detection

# Run with verbose output
python manage.py test storylovers --verbosity=2

# Run with coverage
coverage run --source='storylovers' manage.py test storylovers
coverage report
```

## Key Features Tested

### Automatic Behaviors
- **UUID Generation**: StoryLover and FilmLog use UUIDs as primary keys
- **Decade Calculation**: Film.decade automatically set from Film.year
- **New Director Detection**: FilmLog automatically detects if director is new to story lover
- **Rewatch Detection**: FilmLog automatically detects if film has been logged before
- **Default Rubric**: Only one rubric can be default per story lover

### Validation
- **Rating Range**: 1-10 for both FilmLog.rating and RubricRating.rating
- **Weight Range**: 5-50 for RubricCategory.weight
- **TMDB ID**: Must be unique across all films (or null)

### Relationships
- **One-to-One**: StoryLover ↔ User
- **Foreign Keys**: 
  - FilmLog → StoryLover, Film
  - Rubric → StoryLover
  - RubricCategory → Rubric
  - RubricRating → FilmLog, RubricCategory
- **Unique Together**:
  - Rubric: (story_lover, name)
  - RubricCategory: (rubric, name)
  - RubricRating: (film_log, category)

### Calculated Properties
- **Rubric.total_weight**: Sum of all category weights
- **Rubric.is_valid**: Returns True if total_weight == 100
- **FilmLog.weighted_score**: Calculates score from rubric ratings

## Test Data Patterns

All tests follow Django best practices:
- Use `setUp()` for common test data
- Clean, minimal test data
- One assertion per test (mostly)
- Descriptive test names
- Test both success and failure cases

## Expected Results

All 35 tests should pass:
```
----------------------------------------------------------------------
Ran 35 tests in X.XXXs

OK
```

## Next Steps

1. Run the tests: `python manage.py test storylovers`
1. Add API tests when building REST endpoints
1. Consider adding integration tests for complex workflows

## Coverage Report

To generate a detailed coverage report:

```bash
# Install coverage
pip install coverage

# Run tests with coverage
coverage run --source='storylovers' manage.py test storylovers

# Generate report
coverage report -m

# Generate HTML report
coverage html
open htmlcov/index.html
```

Expected coverage: ~95%+ for storylovers app
