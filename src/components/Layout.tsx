import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import StarField from '@/components/StarField'

export default function Layout() {
  return (
    <div className="relative min-h-screen">
      <StarField />
      <Header />
      <main className="relative z-10 pt-16">
        <Outlet />
      </main>
    </div>
  )
}