import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { path: '/', label: '首页' },
  { path: '/cards', label: '牌库' },
  { path: '/reading', label: '抽牌' },
  { path: '/settings', label: '设置' },
]

export default function Header() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-mystic-950/60 backdrop-blur-xl border-b border-mystic-700/20" />
      <div className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-cinzel text-lg">
          <span className="text-gold-400">✦</span>
          <span className="text-gold-300">命运之轮</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path)
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-cinzel transition-all duration-300 ${
                  isActive
                    ? 'text-gold-300 bg-gold-500/10'
                    : 'text-mystic-200 hover:text-gold-300 hover:bg-mystic-800/40'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <button
          className="md:hidden text-mystic-200 hover:text-gold-300 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-mystic-950/90 backdrop-blur-xl border-b border-mystic-700/20 animate-fade-in">
          <div className="px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg font-cinzel transition-all duration-300 ${
                    isActive
                      ? 'text-gold-300 bg-gold-500/10'
                      : 'text-mystic-200 hover:text-gold-300'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}