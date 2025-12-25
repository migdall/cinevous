import type { Film, List, Rubric, League } from '../types'

export const mockFilms: Film[] = [
  {
    id: 1,
    title: "Past Lives",
    year: 2023,
    director: "Celine Song",
    genre: "Drama",
    country: "USA/Korea",
    decade: "2020s",
    loggedAt: new Date(2024, 11, 7, 22, 30),
    mood: "melancholy",
    isNewDirector: true,
    rating: 9,
    review: "A quiet masterpiece about the paths not taken. The final scene left me breathless.",
    rubricRatings: { 1: { 1: 9, 2: 10, 3: 8, 4: 9, 5: 7, 6: 10 } }
  },
  {
    id: 2,
    title: "Aftersun",
    year: 2022,
    director: "Charlotte Wells",
    genre: "Drama",
    country: "UK",
    decade: "2020s",
    loggedAt: new Date(2024, 11, 6, 21, 0),
    mood: "reflective",
    isNewDirector: true,
    rating: 8,
    review: "Memory as a haunting. Paul Mescal deserved more recognition.",
    rubricRatings: { 1: { 1: 9, 2: 8, 3: 9, 4: 10, 5: 8, 6: 9 } }
  },
  {
    id: 3,
    title: "The Holdovers",
    year: 2023,
    director: "Alexander Payne",
    genre: "Comedy",
    country: "USA",
    decade: "2020s",
    loggedAt: new Date(2024, 10, 30, 20, 15),
    mood: "warm",
    isNewDirector: false,
    rating: 8,
    review: "",
    rubricRatings: {}
  },
  {
    id: 4,
    title: "Fallen Angels",
    year: 1995,
    director: "Wong Kar-wai",
    genre: "Drama",
    country: "Hong Kong",
    decade: "1990s",
    loggedAt: new Date(2024, 10, 29, 23, 45),
    mood: "dreamy",
    isNewDirector: false,
    rating: 10,
    review: "Peak Wong Kar-wai. The cinematography is intoxicating.",
    rubricRatings: { 1: { 1: 10, 2: 9, 3: 10, 4: 9, 5: 10, 6: 9 } }
  },
  {
    id: 5,
    title: "Ikiru",
    year: 1952,
    director: "Akira Kurosawa",
    genre: "Drama",
    country: "Japan",
    decade: "1950s",
    loggedAt: new Date(2024, 10, 24, 19, 0),
    mood: "profound",
    isNewDirector: false,
    rating: 10,
    review: "Changed how I think about living. The swing scene is cinema at its most transcendent.",
    rubricRatings: { 1: { 1: 10, 2: 10, 3: 9, 4: 10, 5: 8, 6: 10 } }
  },
  {
    id: 6,
    title: "Amélie",
    year: 2001,
    director: "Jean-Pierre Jeunet",
    genre: "Comedy",
    country: "France",
    decade: "2000s",
    loggedAt: new Date(2024, 10, 17, 14, 30),
    mood: "joyful",
    isNewDirector: true,
    rating: 7,
    review: "",
    rubricRatings: { 2: { 1: 9, 2: 8, 3: 8, 4: 7, 5: 8 } }
  },
]

export const mockLists: List[] = [
  {
    id: 1,
    title: "Best of 2023",
    description: "My favorite films from last year",
    films: [1, 3],
    createdAt: new Date(2024, 0, 15)
  },
  {
    id: 2,
    title: "Late Night Comfort Watches",
    description: "Films that feel like a warm blanket",
    films: [4, 6],
    createdAt: new Date(2024, 2, 8)
  }
]

export const mockRubrics: Rubric[] = [
  {
    id: 1,
    name: "Cinephile Standard",
    description: "A comprehensive rubric for serious film analysis",
    categories: [
      { id: 1, name: "Direction", weight: 20 },
      { id: 2, name: "Screenplay", weight: 20 },
      { id: 3, name: "Cinematography", weight: 15 },
      { id: 4, name: "Performances", weight: 20 },
      { id: 5, name: "Score & Sound", weight: 10 },
      { id: 6, name: "Emotional Impact", weight: 15 }
    ],
    isDefault: true
  },
  {
    id: 2,
    name: "Blockbuster Fun",
    description: "For popcorn movies - does it deliver entertainment?",
    categories: [
      { id: 1, name: "Entertainment Value", weight: 30 },
      { id: 2, name: "Visual Spectacle", weight: 25 },
      { id: 3, name: "Rewatchability", weight: 20 },
      { id: 4, name: "Characters", weight: 15 },
      { id: 5, name: "Pacing", weight: 10 }
    ],
    isDefault: false
  }
]

export const mockLeagues: League[] = [
  {
    id: 1,
    name: "Cinephile Championship 2025",
    code: "CINE25",
    members: [
      {
        id: 1,
        name: "You",
        picks: [101, 102, 103, 104, 105],
        points: { q1: 142, q2: 285, q3: 198, q4: 222, globes: 125, oscars: 0 }
      },
      {
        id: 2,
        name: "FilmBuff_Sarah",
        picks: [106, 107, 108, 109, 110],
        points: { q1: 98, q2: 312, q3: 167, q4: 215, globes: 100, oscars: 0 }
      },
      {
        id: 3,
        name: "CinematicMike",
        picks: [111, 102, 112, 113, 114],
        points: { q1: 124, q2: 298, q3: 145, q4: 189, globes: 75, oscars: 0 }
      },
      {
        id: 4,
        name: "ReelTalk_Amy",
        picks: [115, 116, 103, 117, 118],
        points: { q1: 88, q2: 245, q3: 178, q4: 190, globes: 50, oscars: 0 }
      }
    ],
    draftComplete: true,
    season: 2025,
    currentPhase: 'globes'
  }
]

export const genres = ["Drama", "Comedy", "Horror", "Thriller", "Documentary", "Animation", "Sci-Fi", "Romance"]
