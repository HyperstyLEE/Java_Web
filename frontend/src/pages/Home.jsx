import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import { movieAPI } from '../services/api'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [featuredMovies, setFeaturedMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await movieAPI.getMovies()
        setMovies(response.data)
        // 选择评分最高的3部电影作为推荐
        setFeaturedMovies(response.data.sort((a, b) => b.rating - a.rating).slice(0, 3))
      } catch (err) {
        setError('获取电影列表失败')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amc-red"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 btn-primary"
        >
          重试
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* 轮播图 */}
      <div className="relative h-[400px] bg-gray-900 rounded-lg overflow-hidden">
        {featuredMovies.length > 0 && (
          <div className="absolute inset-0">
            <img
              src={featuredMovies[0].posterUrl}
              alt={featuredMovies[0].title}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="text-4xl font-bold mb-4">{featuredMovies[0].title}</h2>
                <p className="text-lg mb-6 line-clamp-2">{featuredMovies[0].description}</p>
                <button className="btn-primary">立即购票</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 正在热映 */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">正在热映</h2>
          <a href="/movies" className="text-amc-red hover:text-red-700 transition">
            查看全部
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* 即将上映 */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">即将上映</h2>
          <a href="/coming-soon" className="text-amc-red hover:text-red-700 transition">
            查看全部
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies
            .filter(movie => new Date(movie.releaseDate) > new Date())
            .slice(0, 4)
            .map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </section>
    </div>
  )
} 