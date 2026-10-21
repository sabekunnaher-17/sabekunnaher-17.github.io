import { useEffect, useState } from 'react'
import { Pause, Play } from 'lucide-react'

/** Decorative developer objects share the native reduced-motion and pause controls. */
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
  return <><div className="light-atmosphere" aria-hidden="true"><div className="light-ribbon ribbon-violet" /><div className="light-ribbon ribbon-peach" /><div className="contour-lines" /><div className="developer-objects">
    <span className="drifting-glyph glyph-tag">&lt;/&gt;</span><span className="drifting-glyph glyph-braces">{'{ }'}</span><span className="drifting-glyph glyph-prompt">&gt;_</span><span className="drifting-glyph glyph-function">ƒ(x)</span><span className="drifting-glyph glyph-hash">#</span><span className="drifting-glyph glyph-array">[ ]</span>
    <div className="ghost-editor editor-build"><div className="ghost-title"><i /><i /><i /><span>build.ts</span></div><code><span>const</span> idea = await create();<br /><span>if</span> (idea.isReady) {'{'}<br />&nbsp; ship(idea);<br />{'}'}<b className="ghost-caret">▌</b></code></div>
    <div className="ghost-editor editor-shell"><div className="ghost-title"><span>~/dev/antora</span></div><code><span>❯</span> git commit -m "create"<br /><span>✓</span> tests passing<br /><span>❯</span> npm run build<b className="ghost-caret">▌</b></code></div>
    <div className="wire-cube"><span /><span /><span /></div><div className="signal-diamond"><span /></div>
    <div className="binary-stream"><span>01001<br />10110<br />00101<br />11000<br />10101<br />00110<br />01001<br />10110<br />00101<br />11000<br />10101<br />00110</span></div>
    <div className="code-satellite"><span /><i /><i /></div>
  </div></div><button className="motion-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={12} /> : <Pause size={12} />}<span>{paused ? 'Resume motion' : 'Pause motion'}</span></button></>
}
