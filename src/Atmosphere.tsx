import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { Pause, Play } from 'lucide-react'

const extraGlyphs = [
  ['=>', 34, 8], ['()', 76, 20], ['&&', 40, 34], ['01', 91, 12],
  ['</>', 30, 49], ['{ }', 82, 44], ['++', 61, 60], ['[ ]', 47, 88],
  ['$_', 87, 86], ['::', 24, 92], ['#', 71, 93], ['!=', 94, 63],
  ['λ', 52, 21], ['0x', 36, 65],
] as const

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
    {extraGlyphs.map(([glyph, left, top], index) => <span key={index} className="drifting-glyph extra-glyph" style={{ '--object-x': `${left}%`, '--object-y': `${top}%`, '--object-size': `${17 + index % 4 * 3}px`, '--object-duration': `${18 + index % 6 * 3}s`, '--object-delay': `${-index * 3 - 2}s`, '--object-rotation': `${index % 2 ? 13 : -12}deg` } as CSSProperties}>{glyph}</span>)}
    <div className="ghost-editor editor-build"><div className="ghost-title"><i /><i /><i /><span>build.ts</span></div><code><span>const</span> idea = await create();<br /><span>if</span> (idea.isReady) {'{'}<br />&nbsp; ship(idea);<br />{'}'}<b className="ghost-caret">▌</b></code></div>
    <div className="ghost-editor editor-shell"><div className="ghost-title"><span>~/dev/antora</span></div><code><span>❯</span> git commit -m "create"<br /><span>✓</span> tests passing<br /><span>❯</span> npm run build<b className="ghost-caret">▌</b></code></div>
    <div className="wire-cube"><span /><span /><span /></div><div className="signal-diamond"><span /></div>
    <div className="binary-stream"><span>01001<br />10110<br />00101<br />11000<br />10101<br />00110<br />01001<br />10110<br />00101<br />11000<br />10101<br />00110</span></div>
    <div className="code-satellite"><span /><i /><i /></div>
    <div className="wire-cube cube-secondary"><span /><span /><span /></div><div className="wire-cube cube-tertiary"><span /><span /><span /></div>
    <div className="signal-diamond diamond-secondary"><span /></div><div className="signal-diamond diamond-tertiary"><span /></div>
    {['stream-secondary', 'stream-tertiary'].map(name => <div key={name} className={`binary-stream ${name}`}><span>10101<br />00110<br />11001<br />01010<br />10011<br />01100<br />10101<br />00110<br />11001<br />01010<br />10011<br />01100</span></div>)}
    <div className="ghost-editor editor-api"><div className="ghost-title"><i /><i /><i /><span>api.cs</span></div><code><span>app</span>.MapGet("/ideas",<br />&nbsp; () =&gt; Results.Ok());<br /><span>// create something good</span></code></div>
  </div></div><button className="motion-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={12} /> : <Pause size={12} />}<span>{paused ? 'Resume motion' : 'Pause motion'}</span></button></>
}
