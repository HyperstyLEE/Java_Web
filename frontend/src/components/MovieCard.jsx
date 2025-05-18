import { Link } from 'react-router-dom'

export default function MovieCard({ movie }) {
  // 格式化时长
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}小时${mins}分钟` : `${mins}分钟`
  }

  // 格式化评分
  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : '暂无评分'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      {/* 电影海报 */}
      <div className="relative">
        <img
          src={movie.posterUrl || '/default-movie.jpg'}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        {/* 评分标签 */}
        <div className="absolute top-2 right-2 bg-amc-red text-white px-2 py-1 rounded">
          {formatRating(movie.rating)}
        </div>
      </div>

      {/* 电影信息 */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{movie.title}</h3>
        
        <div className="space-y-2 text-gray-600 text-sm">
          {/* 时长 */}
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDuration(movie.duration)}
          </div>

          {/* 类型 */}
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            {movie.genre}
          </div>

          {/* 导演 */}
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {movie.director}
          </div>
        </div>

        {/* 购票按钮 */}
        <Link
          to={`/movie/${movie.id}`}
          className="mt-4 block w-full bg-amc-red text-white text-center py-2 rounded hover:bg-red-700 transition"
        >
          立即购票
        </Link>
      </div>
    </div>
  )
} 