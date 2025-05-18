import { useEffect, useState } from 'react'
import { orderAPI } from '../services/api'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderAPI.getOrders()
        setOrders(res.data)
      } catch (err) {
        setError('获取订单失败')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  if (loading) {
    return <div className="text-center py-12">加载中...</div>
  }

  if (error) {
    return <div className="text-center text-red-600 py-12">{error}</div>
  }

  if (orders.length === 0) {
    return <div className="text-center py-12">暂无订单记录</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">我的订单</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">订单号</th>
              <th className="px-4 py-2">电影名</th>
              <th className="px-4 py-2">场次</th>
              <th className="px-4 py-2">购票时间</th>
              <th className="px-4 py-2">票数</th>
              <th className="px-4 py-2">总金额</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId}>
                <td className="border px-4 py-2">{order.orderNo}</td>
                <td className="border px-4 py-2">{order.movieName}</td>
                <td className="border px-4 py-2">{order.showTime}</td>
                <td className="border px-4 py-2">{order.buyTime}</td>
                <td className="border px-4 py-2">{order.ticketCount}</td>
                <td className="border px-4 py-2">¥{order.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 