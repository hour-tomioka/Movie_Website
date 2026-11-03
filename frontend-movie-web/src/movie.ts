export interface Movie {
  id: number
  title: string
  overview: string
  poster_url: string
  release_date: string | null
  rating: number
  tmdb_id: number
}