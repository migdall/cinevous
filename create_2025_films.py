"""
Script to create 20 new 2025 films in the database
Run this script with: python manage.py shell < create_2025_films.py
"""

from storylovers.models import Film

print("Creating 20 new 2025 films...")

anaconda_film = Film.objects.create(title="Anaconda", director="Tom Gormican", year=2025, genre="Comedy", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/5MDnvvkOqthhE5gQebzkcOhD1p5.jpg")
print(f"✓ Created: {anaconda_film.title}")

captain_america_film = Film.objects.create(title="Captain America: Brave New World", director="Julius Onah", year=2025, genre="Action", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/6TCellNCURAfogXS4T6mWS9Z3oi.jpg")
print(f"✓ Created: {captain_america_film.title}")

mission_impossible_film = Film.objects.create(title="Mission: Impossible - The Final Reckoning", director="Christopher McQuarrie", year=2025, genre="Action", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/dtkBAH93xJhLxfRZ9KpAUjIQPbB.jpg")
print(f"✓ Created: {mission_impossible_film.title}")

ballerina_film = Film.objects.create(title="From the World of John Wick: Ballerina", director="Len Wiseman", year=2025, genre="Action", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/mNJoBLC3hjBGJgA1u0vxjHkPZWY.jpg")
print(f"✓ Created: {ballerina_film.title}")

snow_white_film = Film.objects.create(title="Snow White", director="Marc Webb", year=2025, genre="Fantasy", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/6h3sa5dHlGZZkL8g7s1MFJZqXdl.jpg")
print(f"✓ Created: {snow_white_film.title}")

thunderbolts_film = Film.objects.create(title="Thunderbolts*", director="Jake Schreier", year=2025, genre="Action", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/jXsYmhOF7TgWbLgv3jYFoLaVEJD.jpg")
print(f"✓ Created: {thunderbolts_film.title}")

fantastic_four_film = Film.objects.create(title="The Fantastic Four: First Steps", director="Matt Shakman", year=2025, genre="Science Fiction", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/dBUTooCCgiKw3O1aXvRJWmtOTkG.jpg")
print(f"✓ Created: {fantastic_four_film.title}")

jurassic_world_film = Film.objects.create(title="Jurassic World: Rebirth", director="Gareth Edwards", year=2025, genre="Science Fiction", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/92nFij2FE6bcSK8wOl8ZqZ8NhQT.jpg")
print(f"✓ Created: {jurassic_world_film.title}")

baktan_cross_film = Film.objects.create(title="The Battle of Baktan Cross", director="Mel Gibson", year=2025, genre="War", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/vbKJVN0l1zPj0mupOT5eVx1AH1T.jpg")
print(f"✓ Created: {baktan_cross_film.title}")

housemaid_film = Film.objects.create(title="The Housemaid", director="Paul Feig", year=2025, genre="Thriller", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/rJ5yFvLbcyWfLx9Gj3xMBcKZv2S.jpg")
print(f"✓ Created: {housemaid_film.title}")

gorge_film = Film.objects.create(title="The Gorge", director="Scott Derrickson", year=2025, genre="Horror", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/9n6LuXA5w2NqGyNT3mhHWxMFMHP.jpg")
print(f"✓ Created: {gorge_film.title}")

sinners_film = Film.objects.create(title="Sinners", director="Ryan Coogler", year=2025, genre="Horror", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/hJVRnkLBTvgkX4nCF9fQ9PfPSkH.jpg")
print(f"✓ Created: {sinners_film.title}")

bride_film = Film.objects.create(title="The Bride!", director="Maggie Gyllenhaal", year=2025, genre="Romance", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/uIpVOpUdnJ35LYYUbEiLYDMwM76.jpg")
print(f"✓ Created: {bride_film.title}")

elio_film = Film.objects.create(title="Elio", director="Domee Shi", year=2025, genre="Animation", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/c5gDMdJWAjKMIB89R3HHrBw2bDz.jpg")
print(f"✓ Created: {elio_film.title}")

freakier_friday_film = Film.objects.create(title="Freakier Friday", director="Nisha Ganatra", year=2025, genre="Comedy", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/qhrS66icqprgcNcCZjE5Kbv5ANY.jpg")
print(f"✓ Created: {freakier_friday_film.title}")

httyd_film = Film.objects.create(title="How to Train Your Dragon", director="Dean DeBlois", year=2025, genre="Fantasy", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/f4dTBbPlC2PQDbE67ChoqKRvLp4.jpg")
print(f"✓ Created: {httyd_film.title}")

smashing_machine_film = Film.objects.create(title="The Smashing Machine", director="Benny Safdie", year=2025, genre="Drama", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/pJpLwOIAHVqmcvyxJv8RI3T4Gvg.jpg")
print(f"✓ Created: {smashing_machine_film.title}")

erupcja_film = Film.objects.create(title="Erupcja", director="David Yarovesky", year=2025, genre="Action", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/sQPmWPRuimx3FZmfqfQQkMQhLy2.jpg")
print(f"✓ Created: {erupcja_film.title}")

tron_film = Film.objects.create(title="Tron: Ares", director="Joachim Rønning", year=2025, genre="Science Fiction", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/7K5gVJdMiYV4fRKfh8HVIkHlW4y.jpg")
print(f"✓ Created: {tron_film.title}")

amateur_film = Film.objects.create(title="The Amateur", director="James Hawes", year=2025, genre="Thriller", country="USA", decade="2020s", poster_url="https://image.tmdb.org/t/p/w1280/kHHwEcT44jvnYVPTT8Zqa2w2OTH.jpg")
print(f"✓ Created: {amateur_film.title}")

print("\n✅ Successfully created 20 new 2025 films!")
print(f"Total films in database: {Film.objects.count()}")
