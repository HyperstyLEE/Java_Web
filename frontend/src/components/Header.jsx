import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="bg-amc-red text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center">
            <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
            </svg>
            Movie Tickets
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-red-200 transition">首页</Link>
            <Link to="/movies" className="hover:text-red-200 transition">电影</Link>
            {token ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:text-red-200 transition"
                >
                  <span>我的账户</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link to="/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">我的订单</Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="hover:text-red-200 transition">登录</Link>
                <Link to="/register" className="btn-secondary">注册</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link to="/" className="block hover:text-red-200 transition">首页</Link>
            <Link to="/movies" className="block hover:text-red-200 transition">电影</Link>
            {token ? (
              <>
                <Link to="/orders" className="block hover:text-red-200 transition">我的订单</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left hover:text-red-200 transition"
                >
                  退出登录
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block hover:text-red-200 transition">登录</Link>
                <Link to="/register" className="block hover:text-red-200 transition">注册</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
} 