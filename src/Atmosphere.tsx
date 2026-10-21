import { useEffect, useState } from 'react'
import { Pause, Play } from 'lucide-react'

/** CSS light ribbons replace the particle network; native reduced-motion and pause support. */
export function Atmosphere() {
  const [paused, setPaused] = useState(() => {
    try { return localStorage.getItem('antora-motion') === 'paused' } catch { return false }
  })
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'running'
    try { localStorage.setItem('antora-motion', paused ? 'paused' : 'running') } catch { /* Storage may be disabled. */ }
  }, [paused])
  useEffect(() => {
    const sync = () => { document.documentElement.dataset.visibility = document.hidden ? 'hidden' : 'visible' }
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])
  return <><div className="light-atmosphere" aria-hidden="true"><div className="light-ribbon ribbon-violet" /><div className="light-ribbon ribbon-peach" /><div className="contour-lines" /></div><button className="motion-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={12} /> : <Pause size={12} />}<span>{paused ? 'Resume motion' : 'Pause motion'}</span></button></>
}
