import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { movieAPI } from '../services/api'

export default function Movies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await movieAPI.getMovies()
        setMovies(res.data)
      } catch (err) {
        setError('获取电影列表失败')
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  if (loading) {
    return <div className="text-center py-12">加载中...</div>
  }

  if (error) {
    return <div className="text-center text-red-600 py-12">{error}</div>
  }

  if (movies.length === 0) {
    return <div className="text-center py-12">暂无电影</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">正在热映</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map(movie => (
          <div
            key={movie.id}
            className="bg-white rounded shadow hover:shadow-lg cursor-pointer p-4 flex flex-col items-center"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            {/* 你可以根据实际数据结构调整图片字段 */}
            {movie.posterUrl && (
              <img src={movie.posterUrl} alt={movie.title} className="w-32 h-48 object-cover mb-2 rounded" />
            )}
            <div className="font-semibold text-lg mb-1">{movie.title}</div>
            <div className="text-gray-500 text-sm mb-2">{movie.genre}</div>
            <div className="text-gray-700 text-sm line-clamp-2">{movie.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
} 