import { useState } from 'react'
import { Link } from 'react-router-dom'
import { person } from './content'

const commands = ['help', 'about', 'skills', 'projects', 'contact', 'clear']
export function Terminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<{ command: string; text: string; path?: string }[]>([])
  function run(raw: string) {
    const command = raw.trim().toLowerCase()
    if (!command) return
    setInput('')
    if (command === 'clear') { setHistory([]); return }
    const answers: Record<string, { text: string; path?: string }> = {
      help: { text: 'Try about, skills, projects, contact, or clear. Select a quick command below.' },
      about: { text: 'CSE student at AIUB. Building secure, well-tested applications. Read my story →', path: '/about/' },
      skills: { text: 'C# · ASP.NET Core · React · SQL · Playwright. Explore the full toolkit →', path: '/skills/' },
      projects: { text: 'ProjectFlow / Q-Billiard Shop / Hospital Appointment System / Solar System. View selected work →', path: '/projects/' },
      contact: { text: `${person.email} — let’s start a conversation →`, path: '/contact/' },
    }
    setHistory(previous => [...previous.slice(-2), { command, ...(answers[command] || { text: `Command not found: ${command.slice(0, 60)}. Type help to see available commands.` }) }])
  }
  return <section className="portfolio-terminal" aria-label="Interactive portfolio terminal"><div className="terminal-title"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>antora@portfolio: ~</span><span className="terminal-mode">INTERACTIVE SHELL</span></div><div className="terminal-body"><p><span className="terminal-accent">~/portfolio</span> Welcome to my corner of the web.</p><p className="terminal-hint">Curious? Type a command or choose one below.</p><div className="terminal-output" role="status" aria-live="polite">{history.map((entry, i) => <div key={i}><p className="terminal-echo">$ {entry.command}</p>{entry.path ? <Link to={entry.path}>{entry.text}</Link> : <p>{entry.text}</p>}</div>)}</div><form onSubmit={event => { event.preventDefault(); run(input) }}><label htmlFor="terminal-command"><span aria-hidden="true">❯</span><span className="sr-only">Portfolio command</span></label><input id="terminal-command" value={input} onChange={event => setInput(event.target.value)} placeholder="help" autoComplete="off" spellCheck={false} maxLength={100} /><button type="submit" aria-label="Run command">Enter ↵</button></form><div className="terminal-shortcuts">{commands.map(command => <button key={command} type="button" onClick={() => run(command)}>{command}</button>)}</div></div></section>
}
