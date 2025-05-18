export default function Footer() {
  return (
    <footer className="bg-amc-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 关于我们 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">关于我们</h3>
            <p className="text-gray-400">
              我们致力于为您提供最好的电影票务服务，让您的观影体验更加便捷和愉快。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition">首页</a></li>
              <li><a href="/movies" className="text-gray-400 hover:text-white transition">电影</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition">关于我们</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition">联系我们</a></li>
            </ul>
          </div>

          {/* 帮助中心 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">帮助中心</h3>
            <ul className="space-y-2">
              <li><a href="/faq" className="text-gray-400 hover:text-white transition">常见问题</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white transition">服务条款</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white transition">隐私政策</a></li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2 text-gray-400">
              <li>电话：123-456-7890</li>
              <li>邮箱：support@movietickets.com</li>
              <li>地址：123 Movie Street, Cinema City</li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Movie Tickets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 