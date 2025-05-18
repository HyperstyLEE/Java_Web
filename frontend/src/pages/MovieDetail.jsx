import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { movieAPI, seatAPI, orderAPI } from '../services/api'

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [showtimes, setShowtimes] = useState([])
  const [selectedShowtime, setSelectedShowtime] = useState(null)
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieResponse, showtimesResponse] = await Promise.all([
          movieAPI.getMovieById(id),
          movieAPI.getShowtimes(id)
        ])
        setMovie(movieResponse.data)
        setShowtimes(showtimesResponse.data)
      } catch (err) {
        setError('获取电影信息失败')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  useEffect(() => {
    const fetchSeats = async () => {
      if (selectedShowtime) {
        try {
          const response = await seatAPI.getSeats(selectedShowtime.id)
          setSeats(response.data)
        } catch (err) {
          console.error('获取座位信息失败:', err)
        }
      }
    }

    fetchSeats()
  }, [selectedShowtime])

  const handleSeatClick = (seat) => {
    if (seat.status === 'AVAILABLE') {
      setSelectedSeats(prev => {
        const isSelected = prev.find(s => s.id === seat.id)
        if (isSelected) {
          return prev.filter(s => s.id !== seat.id)
        } else {
          return [...prev, seat]
        }
      })
    }
  }

  const handleBookTickets = async () => {
    if (!selectedShowtime || selectedSeats.length === 0) {
      alert('请选择场次和座位')
      return
    }

    try {
      const orderData = {
        movieId: movie.id,
        showtimeId: selectedShowtime.id,
        seatIds: selectedSeats.map(seat => seat.id)
      }
      
      await orderAPI.createOrder(orderData)
      navigate('/orders')
    } catch (err) {
      console.error('创建订单失败:', err)
      alert('创建订单失败，请重试')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amc-red"></div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error || '电影不存在'}</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 btn-primary"
        >
          返回首页
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 电影信息 */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-2/3 space-y-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <div className="flex items-center space-x-4">
            <span className="bg-amc-red text-white px-3 py-1 rounded">
              {movie.rating?.toFixed(1) || '暂无评分'}
            </span>
            <span>{movie.duration}分钟</span>
            <span>{movie.genre}</span>
          </div>
          <p className="text-gray-600">{movie.description}</p>
          <div className="space-y-2">
            <p><span className="font-semibold">导演：</span>{movie.director}</p>
            <p><span className="font-semibold">主演：</span>{movie.actors}</p>
            <p><span className="font-semibold">上映日期：</span>{new Date(movie.releaseDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* 场次选择 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">选择场次</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {showtimes.map(showtime => (
            <button
              key={showtime.id}
              onClick={() => setSelectedShowtime(showtime)}
              className={`p-4 rounded-lg border ${
                selectedShowtime?.id === showtime.id
                  ? 'border-amc-red bg-red-50'
                  : 'border-gray-200 hover:border-amc-red'
              }`}
            >
              <div className="text-center">
                <div className="font-semibold">{new Date(showtime.startTime).toLocaleDateString()}</div>
                <div className="text-amc-red">{new Date(showtime.startTime).toLocaleTimeString()}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 座位选择 */}
      {selectedShowtime && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">选择座位</h2>
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-1/3 h-4 bg-gray-200 rounded-t-full"></div>
            </div>
            <div className="grid grid-cols-8 gap-2">
              {seats.map(seat => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  disabled={seat.status !== 'AVAILABLE'}
                  className={`aspect-square rounded-t-lg ${
                    seat.status === 'AVAILABLE'
                      ? selectedSeats.find(s => s.id === seat.id)
                        ? 'bg-amc-red'
                        : 'bg-green-500 hover:bg-green-600'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {seat.seatNumber}
                </button>
              ))}
            </div>
          </div>
          
          {/* 座位图例 */}
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-t-lg mr-2"></div>
              <span>可选</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-amc-red rounded-t-lg mr-2"></div>
              <span>已选</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-300 rounded-t-lg mr-2"></div>
              <span>已售</span>
            </div>
          </div>
        </div>
      )}

      {/* 购票按钮 */}
      <div className="sticky bottom-0 bg-white border-t p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <p className="text-gray-600">已选 {selectedSeats.length} 个座位</p>
            <p className="text-xl font-bold">
              总计：¥{selectedSeats.length * (selectedShowtime?.price || 0)}
            </p>
          </div>
          <button
            onClick={handleBookTickets}
            disabled={!selectedShowtime || selectedSeats.length === 0}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            确认购票
          </button>
        </div>
      </div>
    </div>
  )
} 