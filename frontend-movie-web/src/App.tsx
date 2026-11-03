import { useEffect, useState } from 'react'
import type { Movie } from './movie'
import './App.css'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/movies/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load movies')
        }
        return response.json()
      })
      .then((data: Movie[]) => {
        setMovies(data)
      })
      .catch((err: unknown) => {
        console.error(err)
        setError('Could not load movies. Please check that Django is running.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <header className="navbar">
        <nav className="nav-container">
          <a href="#" className="logo">
            Movie<span>Hub</span>
          </a>

          <div className="nav-links">
            <a href="#" className="active">Home</a>
            <a href="#movies">Movies</a>
          </div>

          <input
            className="search-box"
            type="search"
            placeholder="Search movies..."
            aria-label="Search movies"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </nav>
      </header>

      <main className="main-container">
        <section className="hero">
          <div className="hero-content">
            <p className="hero-eyebrow">Your next movie night starts here</p>

            <h2>Stories Worth Staying Up For.</h2>

            <p className="hero-description">
              Explore unforgettable stories, discover new favorites, and find
              your next great movie with MovieHub.
            </p>

            <a className="hero-button" href="#movies">
              Explore Movies&nbsp; →
            </a>
          </div>
        </section>

        <section className="movie-section" id="movies">
          <div className="section-heading">
            <h2>Discover Movies</h2>
            <span className="movie-count">
              {filteredMovies.length} movies
            </span>
          </div>

          {loading && (
            <div className="status-message">
              <div className="spinner" />
              Loading your movies...
            </div>
          )}

          {error && (
            <p className="status-message error-message">{error}</p>
          )}

          {!loading && !error && filteredMovies.length === 0 && (
            <p className="status-message">
              {movies.length === 0
                ? 'No movies have been added yet.'
                : 'No movies match your search. Try another title.'}
            </p>
          )}

          {!loading && !error && filteredMovies.length > 0 && (
            <div className="movie-grid">
              {filteredMovies.map((movie) => (
                <article className="movie-card" key={movie.id}>
                  <div className="movie-poster">
                    {movie.poster_url ? (
                      <img
                        src={movie.poster_url}
                        alt={`${movie.title} poster`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="no-poster">No poster available</div>
                    )}
                  </div>

                  <div className="movie-info">
                    <h3 className="movie-title" title={movie.title}>
                      {movie.title}
                    </h3>

                    <div className="movie-meta">
                      <span>
                        {movie.release_date
                          ? movie.release_date.slice(0, 4)
                          : 'Release date TBA'}
                      </span>

                      <span className="movie-rating">
                        ★ {Number(movie.rating).toFixed(1)}
                      </span>
                    </div>

                    {movie.overview && (
                      <p className="movie-overview">{movie.overview}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>
          <span>MovieHub</span> — Discover your next favorite movie.
        </p>
      </footer>
    </>
  )
}

export default App