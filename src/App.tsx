import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowDownToLine, ArrowUpRight, Menu, X } from 'lucide-react'
import { destinations, person, routePath } from './content'
import { About, Contact, Education, Home, Leadership, Projects, Research, Skills } from './pages'
import { Outbound } from './components'
import { Atmosphere } from './Atmosphere'

function Navigation() {
  const [expanded, setExpanded] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const drawer = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!expanded) return
    drawer.current?.querySelector('a')?.focus()
    const keydown = (event: KeyboardEvent) => {
      const links = drawer.current?.querySelectorAll('a')
      if (event.key === 'Escape') { setExpanded(false); toggle.current?.focus() }
      if (event.key !== 'Tab' || !links?.length) return
      if (document.activeElement === toggle.current) { event.preventDefault(); (event.shiftKey ? links[links.length - 1] : links[0]).focus() }
      else if ((!event.shiftKey && document.activeElement === links[links.length - 1]) || (event.shiftKey && document.activeElement === links[0])) { event.preventDefault(); toggle.current?.focus() }
    }
    const resize = () => setExpanded(false)
    document.addEventListener('keydown', keydown)
    window.addEventListener('resize', resize)
    return () => { document.removeEventListener('keydown', keydown); window.removeEventListener('resize', resize) }
  }, [expanded])

  return <header className="navigation-rail"><div className="rail-brand"><Link to="/" aria-label="Sabekunnaher Antora home" onClick={() => setExpanded(false)}><span className="monogram">sa<span>.</span></span><span>SABEKUNNAHER<br />ANTORA</span></Link><button ref={toggle} type="button" className="menu-button" aria-label={expanded ? 'Close navigation' : 'Open navigation'} aria-controls="portfolio-navigation" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? <X /> : <Menu />}</button></div><div ref={drawer} id="portfolio-navigation" className={`rail-drawer ${expanded ? 'expanded' : ''}`}><p className="rail-index">// EXPLORE THE SYSTEM</p><nav aria-label="Portfolio navigation">{destinations.map((page, index) => <NavLink key={page.slug} to={routePath(page.slug)} end onClick={() => setExpanded(false)}><span className="nav-number">0{index}</span><span>{page.label}</span><ArrowUpRight size={14} aria-hidden="true" /></NavLink>)}</nav><div className="rail-bottom"><a className="rail-cv" href={person.cv} download>Download CV (PDF)<ArrowDownToLine size={15} /></a><div className="rail-socials"><Outbound href={person.github}>GitHub</Outbound><Outbound href={person.linkedin}>LinkedIn</Outbound></div><p>BASED IN DHAKA<br />CODE. TEST. ITERATE.</p></div></div></header>
}

function PageLifecycle() {
  const location = useLocation()
  const lastKey = useRef(location.key)
  useEffect(() => {
    const page = destinations.find(page => routePath(page.slug) === (location.pathname === '/' ? '/' : `${location.pathname.replace(/\/$/, '')}/`))
    const title = page?.title || 'Page not found — Sabekunnaher Antora'
    const description = page?.description || 'This destination could not be found. Return to the portfolio homepage.'
    document.title = title
    for (const key of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) document.querySelector(key)?.setAttribute('content', description)
    for (const key of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) document.querySelector(key)?.setAttribute('content', title)
    const canonical = `https://sabekunnaher-17.github.io${page ? routePath(page.slug) : location.pathname}`
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical)
    if (lastKey.current !== location.key && location.hash !== '#main') {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
    }
    lastKey.current = location.key
  }, [location.key, location.pathname, location.hash])
  return null
}

export default function App() {
  const location = useLocation()
  const current = destinations.find(page => routePath(page.slug) === location.pathname) || destinations[0]
  return <div className="portfolio-shell"><a className="skip-link" href="#main">Skip to content</a><Atmosphere /><Navigation /><PageLifecycle /><div className="content-shell"><div className="content-topbar"><span><i aria-hidden="true" />SABEKUNNAHER ANTORA <b>/</b> {current.label.toUpperCase()}</span><a href={`mailto:${person.email}`} aria-label="Email Antora"><ArrowUpRight size={17} /></a></div><main id="main" tabIndex={-1}><div className="route-stage" key={location.pathname}><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/skills" element={<Skills />} /><Route path="/projects" element={<Projects />} /><Route path="/research" element={<Research />} /><Route path="/leadership" element={<Leadership />} /><Route path="/education" element={<Education />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<section className="page not-found"><p className="eyebrow">404 / A DIFFERENT PATH</p><h1 tabIndex={-1}>This page isn’t here.</h1><p>There’s more to explore in the portfolio.</p><Link to="/" className="button button-blue">Return Home<ArrowUpRight size={16} /></Link></section>} /></Routes></div></main><footer className="site-footer"><p>© {new Date().getFullYear()} Sabekunnaher Antora</p><span>THOUGHTFUL CODE. RELIABLE EXPERIENCES.</span><Link to="/">Return Home<ArrowUpRight size={14} /></Link></footer></div></div>
}
