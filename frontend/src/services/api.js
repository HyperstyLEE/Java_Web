import axios from 'axios'

// 创建 axios 实例
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器：添加 token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器：处理错误
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // token 过期或无效，清除本地存储并跳转到登录页
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// 用户相关 API
export const authAPI = {
  // 用户注册
  register: (userData) => api.post('/user/register', userData),
  
  // 用户登录
  login: (credentials) => api.post('/user/login', credentials),
  
  // 获取当前用户信息
  getCurrentUser: () => api.get('/user/info')
}

// 电影相关 API
export const movieAPI = {
  // 获取电影列表
  getMovies: () => api.get('/movie/list'),
  
  // 获取电影详情
  getMovieById: (id) => api.get(`/movie/${id}`),
  
  // 获取电影场次
  getShowtimes: (movieId) => api.get(`/movie/${movieId}/showtimes`)
}

// 订单相关 API
export const orderAPI = {
  // 创建订单
  createOrder: (orderData) => api.post('/order/create', orderData),
  
  // 获取订单列表
  getOrders: () => api.get('/order/list'),
  
  // 获取订单详情
  getOrderById: (id) => api.get(`/order/${id}`),
  
  // 取消订单
  cancelOrder: (id) => api.post(`/order/${id}/cancel`)
}

// 座位相关 API
export const seatAPI = {
  // 获取场次座位信息
  getSeats: (showtimeId) => api.get(`/seat/${showtimeId}`),
  
  // 锁定座位
  lockSeats: (data) => api.post('/seat/lock', data),
  
  // 释放座位
  releaseSeats: (data) => api.post('/seat/release', data)
}

// 导出默认实例，以便需要时直接使用
export default api 