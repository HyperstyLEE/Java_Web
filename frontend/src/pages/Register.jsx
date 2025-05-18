import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致')
      return false
    }
    if (formData.password.length < 6) {
      setError('密码长度至少为6位')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      await authAPI.register({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        phone: formData.phone
      })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || '注册失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">注册</h1>
          <p className="mt-2 text-gray-600">创建您的账户，开始购票之旅</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              用户名
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="input-field mt-1"
              placeholder="请输入用户名"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              邮箱
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field mt-1"
              placeholder="请输入邮箱"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              手机号
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-field mt-1"
              placeholder="请输入手机号"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              密码
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field mt-1"
              placeholder="请输入密码"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              确认密码
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input-field mt-1"
              placeholder="请再次输入密码"
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-amc-red focus:ring-amc-red border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              我已阅读并同意
              <a href="#" className="text-amc-red hover:text-red-700">
                {' '}服务条款{' '}
              </a>
              和
              <a href="#" className="text-amc-red hover:text-red-700">
                {' '}隐私政策
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '注册中...' : '注册'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            已有账户？{' '}
            <Link to="/login" className="text-amc-red hover:text-red-700">
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 