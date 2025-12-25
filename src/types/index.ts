export interface Film {
  id: number
  title: string
  year: number
  director: string
  genre: string
  country: string
  decade: string
  loggedAt: Date
  mood: string
  isNewDirector: boolean
  rating: number | null
  review: string
  rubricRatings: { [rubricId: number]: { [categoryId: number]: number } }
}

export interface List {
  id: number
  title: string
  description: string
  films: number[]
  createdAt: Date
}

export interface Rubric {
  id: number
  name: string
  description: string
  categories: RubricCategory[]
  isDefault: boolean
}

export interface RubricCategory {
  id: number
  name: string
  weight: number
}

export interface LeagueMember {
  id: number
  name: string
  picks: number[]
  points: {
    q1: number
    q2: number
    q3: number
    q4: number
    globes: number
    oscars: number
  }
}

export interface League {
  id: number
  name: string
  code: string
  members: LeagueMember[]
  draftComplete: boolean
  season: number
  currentPhase: 'q1' | 'q2' | 'q3' | 'q4' | 'globes' | 'oscars' | 'complete'
}

export interface FantasyFilm {
  id: number
  title: string
  director: string
  release: string
  releaseDate: string
  genre: string
  hype: number
  stats: {
    q1: number
    q2: number
    q3: number
    q4: number
    globes: number
    oscars: number
  }
}
