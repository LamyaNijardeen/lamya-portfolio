import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { profile, skillGroups, projects, journeyTitle, journey } from './data'

const ease = [0.22, 1, 0.36, 1] as const
const tones = ['white', 'blue', 'orange']

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay, ease }}>
      {children}
    </motion.div>
  )
}

function Img({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true)
  return ok ? <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} /> : null
}

function Head({ label, title }: { label: string; title: string }) {
  return (
    <Reveal className="head">
      <p className="label">{label}</p>
      <h2>{title}</h2>
      <motion.i className="rule" initial={{ width: 0 }} whileInView={{ width: 72 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3, ease }} />
    </Reveal>
  )
}

/* Horizontal scrolling row with arrows */
function Row({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const go = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <div className="row-wrap">
      <button className="arrow l" aria-label="Previous" onClick={() => go(-1)}>‹</button>
      <div className="track" ref={ref}>{children}</div>
      <button className="arrow r" aria-label="Next" onClick={() => go(1)}>›</button>
    </div>
  )
}

const navLinks = [['home', 'Home'], ['story', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['journey', 'Journey'], ['resume', 'Resume']]
const navIds = [...navLinks.map((l) => l[0]), 'contact']

function Nav() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    navIds.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect() }
  }, [])
  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <header className={`nav ${solid || open ? 'solid' : ''}`}>
        <a href="#home" className="brand">{profile.name.split(' ')[0]}</a>
        <nav>
          {navLinks.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>)}
        </nav>
        <div className="nav-right">
          <a href="#contact" className="btn small">Contact</a>
          <button className={`burger ${open ? 'open' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            {[...navLinks, ['contact', 'Contact']].map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  return (
    <section id="home" className="hero" ref={ref}>
      <motion.div className="hero-photo" style={{ scale: photoScale, opacity: fade }}>
        <Img src={profile.photo} alt={profile.name} />
      </motion.div>
      <motion.div className="hero-text" style={{ y: textY, opacity: fade }}>
        <motion.p className="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>{profile.role}</motion.p>
        <h1>
          {profile.name.split(' ').map((w, i) => (
            <span className="mask" key={i}>
              <motion.span initial={{ y: '110%', filter: 'blur(10px)' }} animate={{ y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.2 + i * 0.14, ease }}>{w}</motion.span>
            </span>
          ))}
        </h1>
        <motion.div className="chips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          {profile.tags.map((t) => <span key={t}>{t}</span>)}
        </motion.div>
        <motion.p className="lead" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.7, ease }}>{profile.intro}</motion.p>
        <motion.div className="cta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7, ease }}>
          <a href="#story" className="play">About Me</a>
          <a href="#resume" className="more">My resume</a>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Explore() {
  const cards = [
    { id: 'story', ep: '01', title: 'About Me', pct: 100, tone: 'white' },
    { id: 'skills', ep: '02', title: 'Technical Skills', pct: 80, tone: 'blue' },
    { id: 'projects', ep: '03', title: 'Featured Projects', pct: 60, tone: 'orange' },
    { id: 'journey', ep: '04', title: 'My Development Journey', pct: 40, tone: 'white' },
  ]
  return (
    <div className="explore">
      <h3 className="row-title">Explore My Portfolio</h3>
      <Row>
        {cards.map((c) => (
          <a key={c.id} href={`#${c.id}`} className={`ex-card glow t-${c.tone}`}>
            <span className="ep">Section {c.ep}</span>
            <b>{c.title}</b>
            <i className="bar"><em style={{ width: `${c.pct}%` }} /></i>
          </a>
        ))}
      </Row>
    </div>
  )
}

/* Slowly scrolling strip of words */
function Ticker() {
  const items = [profile.role, ...profile.tags]
  const row = [...items, ...items, ...items, ...items]
  return (
    <div className="ticker" aria-hidden="true">
      <div>{row.map((t, i) => <span key={i}>{t}<b /></span>)}</div>
    </div>
  )
}

function Story() {
  return (
    <section id="story" className="section">
      <Head label="About me" title="Who I Am" />
      <Reveal className="story">
        <p className="story-lead">{profile.about[0]}</p>
        <div>{profile.about.slice(1).map((p, i) => <p className="body" key={i}>{p}</p>)}</div>
      </Reveal>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section">
      <Head label="Technical skills" title="My Skills" />
      <div className="groups">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.07} className="group glow">
            <h3>{g.title}</h3>
            <div className="pills">
              {g.items.map((s, j) => (
                <motion.span key={s} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.25 + j * 0.05, duration: 0.4, ease }}>{s}</motion.span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section nopad">
      <div className="pad"><Head label="Selected work" title="My Projects" /></div>
      <Row>
        {projects.map((p) => (
          <article key={p.title} className="pj glow">
            <div className="pj-img"><Img src={p.image} alt={p.title} /></div>
            <div className="pj-body">
              <div className="chips">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              {p.github && p.github !== '#' && (
                <div className="pj-links">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="more small">GitHub</a>
                </div>
              )}
            </div>
          </article>
        ))}
      </Row>
    </section>
  )
}

/* Timeline: the glowing line fills as you scroll */
function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 28 })
  return (
    <section id="journey" className="section">
      <Head label={journeyTitle} title="My Development Journey" />
      <div className="tl" ref={ref}>
        <div className="tl-rail"><motion.i style={{ scaleY: fill }} /></div>
        {journey.map((j, i) => (
          <motion.div key={j.title} className={`tl-item ${i % 2 ? 'right' : ''}`}
            initial={{ opacity: 0, x: i % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}>
            <span className="tl-dot" />
            <div className="tl-card glow">
              <time>{j.when}</time>
              <h3>{j.title}</h3>
              <p>{j.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Resume() {
  return (
    <section id="resume" className="section">
      <Head label="My resume" title="Resume" />
      <Reveal className="resume glow">
        <div>
          <h3>My qualifications at a glance.</h3>
          <p>Education, experience and skills, ready to download.</p>
        </div>
        <div className="cta">
          <a href={profile.cv} download className="play">Download CV</a>
          <a href={`mailto:${profile.email}`} className="more">Email me</a>
        </div>
      </Reveal>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="end">
      <Reveal>
        <p className="label center">Get in touch</p>
        <h2 className="tbc">Let's Connect</h2>
        <p className="who">{profile.name}<span>{profile.role}</span></p>
        <div className="cta center">
          <a href={`mailto:${profile.email}`} className="btn">Email me</a>
          {profile.socials.map((s) => <a key={s.label} className="ghost" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
        </div>
        <p className="meta">{profile.location}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <form action={profile.formEndpoint} method="POST">
          <input name="name" placeholder="Your name" required />
          <input name="email" type="email" placeholder="Your email" required />
          <textarea name="message" rows={4} placeholder="Your message" required />
          <button className="btn" type="submit">Send message</button>
        </form>
      </Reveal>
    </section>
  )
}

export default function App() {
  /* cursor-following glow on cards and the hero */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      const card = t?.closest<HTMLElement>('.glow')
      if (card) {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--x', `${e.clientX - r.left}px`)
        card.style.setProperty('--y', `${e.clientY - r.top}px`)
      }
      const hero = t?.closest<HTMLElement>('.hero')
      if (hero) {
        const r = hero.getBoundingClientRect()
        hero.style.setProperty('--mx', `${e.clientX - r.left}px`)
        hero.style.setProperty('--my', `${e.clientY - r.top}px`)
      }
    }
    document.addEventListener('mousemove', move)
    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Explore />
        <Ticker />
        <Story />
        <Skills />
        <Projects />
        <Journey />
        <Resume />
        <Contact />
      </main>
      <footer>© {new Date().getFullYear()} {profile.name}</footer>
    </>
  )
}
