import type { ReactNode } from 'react'
import { ArrowDownToLine, ArrowUpRight, ArrowRight, CalendarDays, Check, Circle, CodeXml, Layers3, LockKeyhole } from 'lucide-react'
import { Link } from 'react-router-dom'
import { person, work } from './content'

export function Outbound({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a className={`outbound ${className}`} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
}

export function DownloadCV({ secondary = false }: { secondary?: boolean }) {
  return <a className={`button ${secondary ? 'button-outline' : 'button-blue'}`} href={person.cv} download>Download CV<ArrowDownToLine size={16} aria-hidden="true" /></a>
}

export function Heading({ index, label, children, description }: { index: string; label: string; children: ReactNode; description?: string }) {
  return <div className="page-heading"><p className="eyebrow"><span>{index}</span>{label}</p><h1 tabIndex={-1}>{children}</h1>{description && <p className="page-intro">{description}</p>}</div>
}

export function NextPage({ to, label }: { to: string; label: string }) {
  return <Link className="next-destination" to={to}><span className="eyebrow">CONTINUE EXPLORING</span><span>{label}<ArrowRight size={24} aria-hidden="true" /></span></Link>
}

export function ProjectCopy({ project }: { project: (typeof work)[number] }) {
  return <div className="case-copy"><p className="case-role">{project.role}</p><h3>{project.subtitle}</h3><p>{project.problem}</p><p>{project.solution}</p><ul className="highlights">{project.highlights.map(line => <li key={line}>{line}</li>)}</ul><ul className="tech-list" aria-label={`${project.name} technologies`}>{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul>{'note' in project && <p className="project-note">{project.note}</p>}<Outbound href={project.repo} className="source-link">View repository</Outbound></div>
}

export function CueIllustration() {
  return <div className="cue-visual" aria-hidden="true"><div className="visual-topline"><span>Q—BILLIARD</span><span>DESKTOP / JAVA</span></div><div className="cue-table"><div className="cue-stick" /><div className="cue-stick second" /><span className="billiard-ball"><span>8</span></span><span className="cue-marker marker-one">SHAFT</span><span className="cue-marker marker-two">GRIP</span></div><div className="cue-options"><span><Circle size={12} />Catalog</span><span><Layers3 size={12} />Customize</span><span><Check size={12} />Review</span></div></div>
}

export function CareIllustration() {
  return <div className="care-visual" aria-hidden="true"><div className="visual-topline"><span>CARE / COORDINATED</span><CalendarDays size={18} /></div><div className="care-path"><div><Circle size={17} /><strong>Find a specialization</strong><span>01</span></div><div><CalendarDays size={17} /><strong>Request an appointment</strong><span>02</span></div><div><Check size={17} /><strong>Track the status</strong><span>03</span></div></div><p><LockKeyhole size={13} />Patient and staff workflows</p></div>
}

export function OrbitalIllustration() {
  return <div className="orbital-visual" aria-hidden="true"><div className="visual-topline"><span>ORBITAL STUDIES</span><CodeXml size={16} /></div><svg viewBox="0 0 600 400" fill="none"><path d="M30 200H570M300 30V370" stroke="#252B3A" strokeDasharray="3 8" /><g transform="rotate(-22 300 200)"><ellipse cx="300" cy="200" rx="265" ry="118" stroke="#354158" /><ellipse cx="300" cy="200" rx="200" ry="87" stroke="#4D7CFE" /><ellipse cx="300" cy="200" rx="130" ry="55" stroke="#354158" /><circle cx="72" cy="140" r="10" fill="#929CB0" /><circle cx="465" cy="151" r="14" fill="#60A5FA" /><circle cx="219" cy="243" r="6" fill="#F3F6FC" /></g><circle cx="300" cy="200" r="30" fill="#4D7CFE" /><circle cx="300" cy="200" r="40" stroke="#4D7CFE" strokeOpacity=".3" /></svg><div className="orbital-footer"><span>MOTION</span><span>PERSPECTIVE</span><span>LIGHT</span></div></div>
}
