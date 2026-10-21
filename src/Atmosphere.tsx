import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

/** Decorative network; stops completely when paused, hidden, or reduced motion is requested. */
export function Atmosphere() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [paused, setPaused] = useState(() => {
    try { return localStorage.getItem('antora-motion') === 'paused' } catch { return false }
  })
  useEffect(() => {
    const element = canvas.current
    const context = element?.getContext('2d')
    if (!element || !context) return
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0, height = 0, frame = 0, previous = 0
    const pointer = { x: -1000, y: -1000 }
    let nodes: { x: number; y: number; vx: number; vy: number }[] = []
    const draw = (time = 0) => {
      const step = Math.min((time - previous) / 16.67 || 1, 2)
      previous = time
      context.clearRect(0, 0, width, height)
      nodes.forEach((node, i) => {
        if (!paused && !media.matches) {
          node.x += node.vx * step; node.y += node.vy * step
          if (node.x < 0 || node.x > width) node.vx *= -1
          if (node.y < 0 || node.y > height) node.vy *= -1
        }
        context.fillStyle = 'rgba(82,231,166,.52)'
        context.beginPath(); context.arc(node.x, node.y, 1.5, 0, Math.PI * 2); context.fill()
        nodes.slice(i + 1).forEach(other => {
          const distance = Math.hypot(node.x - other.x, node.y - other.y)
          if (distance < 145) {
            context.strokeStyle = `rgba(82,231,166,${.14 * (1 - distance / 145)})`
            context.beginPath(); context.moveTo(node.x, node.y); context.lineTo(other.x, other.y); context.stroke()
          }
        })
        const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y)
        if (distance < 190) {
          context.strokeStyle = `rgba(82,231,166,${.28 * (1 - distance / 190)})`
          context.beginPath(); context.moveTo(node.x, node.y); context.lineTo(pointer.x, pointer.y); context.stroke()
        }
      })
      if (!paused && !media.matches && !document.hidden) frame = requestAnimationFrame(draw)
    }
    const restart = () => { cancelAnimationFrame(frame); previous = 0; draw() }
    const resize = () => {
      width = innerWidth; height = innerHeight
      const ratio = Math.min(devicePixelRatio || 1, 2)
      element.width = width * ratio; element.height = height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      nodes = Array.from({ length: Math.min(65, Math.floor(width / 20)) }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }))
      restart()
    }
    const move = (event: PointerEvent) => { pointer.x = event.clientX; pointer.y = event.clientY }
    const leave = () => { pointer.x = -1000; pointer.y = -1000 }
    resize()
    addEventListener('resize', resize); addEventListener('pointermove', move); document.addEventListener('pointerleave', leave)
    document.addEventListener('visibilitychange', restart); media.addEventListener('change', restart)
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('resize', resize); removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave)
      document.removeEventListener('visibilitychange', restart); media.removeEventListener('change', restart)
    }
  }, [paused])
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'running'
    try { localStorage.setItem('antora-motion', paused ? 'paused' : 'running') } catch { /* Storage may be disabled. */ }
  }, [paused])
  return <><canvas className="network-field" ref={canvas} aria-hidden="true" /><button className="motion-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={12} /> : <Pause size={12} />}<span>{paused ? 'Resume motion' : 'Pause motion'}</span></button></>
}
