import { useEffect, useRef } from 'react'

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
    }))

    let animId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const star of stars) {
        star.alpha += star.speed * star.direction
        if (star.alpha > 1 || star.alpha < 0.1) {
          star.direction *= -1
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232, 224, 240, ${star.alpha * 0.8})`
        ctx.fill()
      }

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}