import { useEffect, useRef, useState, useCallback } from 'react'
import s from './App.module.css'

const APK_URL = 'https://github.com/Haider-Haj-Ahmed/techtalk-portal/releases/download/v1.0.0/techtalk.apk'

/* ── Floating code snippets data ──────────────────────── */
const CODE_SNIPPETS = [
  { lang: 'js',  lines: ['await techtalk.post({', '  title: "My first post",', '  tags: ["react", "oss"]', '})'] },
  { lang: 'php', lines: ['$post->reactions()', '  ->where("type", "like")', '  ->count();'] },
  { lang: 'js',  lines: ['socket.on("notification",', '  (data) => {', '    notify(data.message)', '  })'] },
  { lang: 'php', lines: ['Route::middleware("auth:sanctum")', '  ->group(function () {', '    Route::post("/posts", ...)', '  });'] },
  { lang: 'js',  lines: ['const feed = useFeed({', '  filter: "following",', '  page: 1', '})'] },
  { lang: 'php', lines: ['User::find($id)', '  ->follow($target)', '  ->notify();'] },
  { lang: 'js',  lines: ['// earn XP for every action', 'user.xp += ACTIONS.comment', 'user.checkLevelUp()'] },
  { lang: 'php', lines: ['Comment::withMentions()', '  ->where("post_id", $id)', '  ->latest()->get()'] },
]

const FEATURES = [
  {
    icon: <IconUsers />,
    label: 'Community',
    desc: 'Follow developers, build your network, and see what the people you care about are building.',
  },
  {
    icon: <IconCode />,
    label: 'Code',
    desc: 'Share snippets, start technical discussions, and get real feedback from real engineers.',
  },
  {
    icon: <IconChat />,
    label: 'Discuss',
    desc: 'Threaded conversations with @mentions, reactions, and nested replies — built for depth.',
  },
  {
    icon: <IconStar />,
    label: 'Earn XP',
    desc: 'Every post, comment, and reaction earns you XP. Level up and unlock your expert badge.',
  },
]

const STATS = [
  { value: '100%', label: 'Free to download' },
  { value: '4', label: 'Core features' },
  { value: 'v1.0', label: 'Fresh release' },
  { value: '∞', label: 'Discussions' },
]

const WORDS = ['community', 'code', 'discuss', 'grow']

/* ── App ──────────────────────────────────────────────── */
export default function App() {
  const [wordIdx, setWordIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const heroRef = useRef(null)
  const phoneRef = useRef(null)

  /* Typewriter */
  useEffect(() => {
    const word = WORDS[wordIdx]
    let i = typing ? displayed.length : displayed.length
    if (typing) {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
        return () => clearTimeout(t)
      } else {
        setWordIdx((w) => (w + 1) % WORDS.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, wordIdx])

  /* Phone parallax on mouse */
  const handleMouseMove = useCallback((e) => {
    if (!phoneRef.current) return
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / rect.width
    const dy = (e.clientY - cy) / rect.height
    phoneRef.current.style.transform = `perspective(900px) rotateY(${dx * 8}deg) rotateX(${-dy * 6}deg) translateY(-8px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!phoneRef.current) return
    phoneRef.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(-8px)'
  }, [])

  /* Scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add(s.revealed); io.unobserve(e.target) } })
    }, { threshold: 0.15 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className={s.page}>
      {/* Floating code background */}
      <div className={s.codeField} aria-hidden>
        {CODE_SNIPPETS.map((snip, i) => (
          <FloatingSnippet key={i} snip={snip} index={i} />
        ))}
      </div>

      {/* Ambient grid */}
      <div className={s.grid} aria-hidden />

      {/* NAV */}
      <nav className={s.nav}>
        <div className={s.navLogo}>
          <TTLogo size={30} />
          <span className={s.navBrand}>Tech Talk</span>
        </div>
        <a href="#download" className={s.navCta}>
          <IconDownload size={14} />
          Get the app
        </a>
      </nav>

      {/* ── HERO ── */}
      <section
        className={s.hero}
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={s.heroGlow} aria-hidden />
        <div className={s.heroGlow2} aria-hidden />

        <div className={s.heroLeft}>
          <div className={s.heroBadge}>
            <span className={s.heroBadgeDot} />
            Android · v1.0.0
          </div>

          <h1 className={s.heroTitle}>
            The place to{' '}
            <span className={s.heroWord}>
              {displayed}
              <span className={s.cursor} />
            </span>
          </h1>

          <p className={s.heroSub}>
            Tech Talk brings developers together in one interactive community —
            share posts, write blogs, react to ideas, and level up together.
          </p>

          <div className={s.heroCtas} id="download">
            <a href={APK_URL} download className={s.dlBtn}>
              <IconDownload size={18} />
              <span>
                <span className={s.dlBtnSub}>Free download</span>
                <span className={s.dlBtnMain}>Get the APK</span>
              </span>
              <span className={s.dlBadge}>Android</span>
            </a>

            <div className={s.dlMeta}>
              <span>v1.0.0</span>
              <span className={s.dlDot}>·</span>
              <span>Free</span>
              <span className={s.dlDot}>·</span>
              <span>No account required to browse</span>
            </div>
          </div>
        </div>

        <div className={s.heroRight}>
          <div className={s.phoneWrap} ref={phoneRef}>
            <div className={s.phoneHalo} aria-hidden />
            <div className={s.phoneHalo2} aria-hidden />
            <Phone />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className={s.statsBar} data-reveal>
        {STATS.map(st => (
          <div key={st.label} className={s.stat}>
            <span className={s.statValue}>{st.value}</span>
            <span className={s.statLabel}>{st.label}</span>
          </div>
        ))}
      </div>

      {/* ── FEATURES ── */}
      <section className={s.features}>
        <div className={s.sectionEye} data-reveal>What's inside</div>
        <h2 className={s.sectionTitle} data-reveal>Everything a dev community needs</h2>

        <div className={s.featGrid}>
          {FEATURES.map((f, i) => (
            <div key={f.label} className={s.featCard} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <div className={s.featIcon}>{f.icon}</div>
              <h3 className={s.featLabel}>{f.label}</h3>
              <p className={s.featDesc}>{f.desc}</p>
              <div className={s.featCardGlow} aria-hidden />
            </div>
          ))}
        </div>
      </section>

      {/* ── CODE SHOWCASE ── */}
      <section className={s.showcase}>
        <div className={s.showcaseInner} data-reveal>
          <div className={s.showcaseText}>
            <div className={s.sectionEye}>Open API</div>
            <h2 className={s.sectionTitle}>Built on a solid Laravel backend</h2>
            <p className={s.showcaseSub}>
              Real-time notifications via Pusher, Sanctum auth with OTP, 
              nested comments with @mentions — the app is backed by a 
              production-grade REST API.
            </p>
            <ul className={s.showcaseList}>
              {['Sanctum + OTP authentication', 'Real-time Pusher notifications', 'XP & badge system', 'Follow, react, mention'].map(item => (
                <li key={item} className={s.showcaseItem}>
                  <span className={s.showcaseCheck}>✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={s.codeWindow}>
            <div className={s.codeWindowBar}>
              <span className={s.dot1} /><span className={s.dot2} /><span className={s.dot3} />
              <span className={s.codeWindowTitle}>techtalk.js</span>
            </div>
            <pre className={s.codeWindowBody}><code>{`// Join the conversation
const client = new TechTalk({ token })

// Post something
await client.posts.create({
  title: "Why I love open source",
  tags: ["oss", "community"],
  body: markdownContent,
})

// Real-time notifications
client.on("notification", (n) => {
  if (n.type === "mention") {
    showToast(\`@\${n.from} mentioned you\`)
  }
})

// Level up
client.xp.on("levelup", ({ level, badge }) => {
  celebrate(\`You're now \${badge}!\`)
})`}</code></pre>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className={s.finalCta} data-reveal>
        <div className={s.finalGlow} aria-hidden />
        <TTLogo size={52} />
        <h2 className={s.finalTitle}>Ready to join?</h2>
        <p className={s.finalSub}>Download Tech Talk and start building your dev presence today.</p>
        <a href={APK_URL} download className={s.dlBtn}>
          <IconDownload size={18} />
          <span>
            <span className={s.dlBtnSub}>Free download</span>
            <span className={s.dlBtnMain}>Get the APK</span>
          </span>
          <span className={s.dlBadge}>Android</span>
        </a>
      </section>

      {/* FOOTER */}
      <footer className={s.footer}>
        <div className={s.footerLogo}>
          <TTLogo size={18} />
          <span>Tech Talk</span>
        </div>
        <p className={s.footerCopy}>© {new Date().getFullYear()} Tech Talk. All rights reserved.</p>
      </footer>
    </div>
  )
}

/* ── Floating snippet ──────────────────────────────────── */
function FloatingSnippet({ snip, index }) {
  const POSITIONS = [
    { top: '8%',  left: '2%'  },
    { top: '15%', right: '3%' },
    { top: '38%', left: '1%'  },
    { top: '55%', right: '2%' },
    { top: '72%', left: '3%'  },
    { top: '80%', right: '4%' },
    { top: '28%', left: '0%'  },
    { top: '62%', right: '1%' },
  ]
  const pos = POSITIONS[index % POSITIONS.length]
  const dur = 14 + (index * 3.7) % 12
  const delay = -(index * 2.3)

  const TOKEN = {
    js:  { kw: '#79B8FF', fn: '#B392F0', str: '#9ECBFF', cm: '#6A737D', punct: '#E1E4E8' },
    php: { kw: '#F97583', fn: '#B392F0', str: '#9ECBFF', cm: '#6A737D', punct: '#E1E4E8' },
  }
  const t = TOKEN[snip.lang]

  return (
    <div
      className={s.floatSnippet}
      style={{
        ...pos,
        animationDuration: `${dur}s`,
        animationDelay: `${delay}s`,
      }}
    >
      <div className={s.floatSnippetLang}>{snip.lang}</div>
      <pre className={s.floatSnippetCode}>
        {snip.lines.map((line, li) => (
          <div key={li}>{colorize(line, t)}</div>
        ))}
      </pre>
    </div>
  )
}

function colorize(line, t) {
  // very lightweight syntax hint
  return line
    .split(/(\$\w+|await|const|return|->|=>|function|\(|\)|{|}|"[^"]*"|'[^']*'|\/\/.*$)/)
    .map((part, i) => {
      if (/^\/\//.test(part)) return <span key={i} style={{ color: t.cm }}>{part}</span>
      if (/^(await|const|return|function)$/.test(part)) return <span key={i} style={{ color: t.kw }}>{part}</span>
      if (/^\$\w+/.test(part)) return <span key={i} style={{ color: '#79C0FF' }}>{part}</span>
      if (/^["']/.test(part)) return <span key={i} style={{ color: t.str }}>{part}</span>
      if (/^(->|=>)$/.test(part)) return <span key={i} style={{ color: t.kw }}>{part}</span>
      if (/^[(){}]$/.test(part)) return <span key={i} style={{ color: t.punct }}>{part}</span>
      return <span key={i}>{part}</span>
    })
}

/* ── Phone mockup ─────────────────────────────────────── */
function Phone() {
  return (
    <div className={s.phone}>
      <div className={s.phoneInner}>
        <div className={s.phoneNotch} />
        {/* Simulated splash screen */}
        <div className={s.phoneScreen}>
          <div className={s.phoneScreenBg}>
            <div className={s.phoneLogo}><TTLogo size={54} /></div>
            <div className={s.phoneAppName}>Tech Talk</div>
            <div className={s.phoneVersion}>v 1.0.0</div>
            <div className={s.phoneBar}>
              <div className={s.phoneBarFill} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Logo ─────────────────────────────────────────────── */
function TTLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="rgba(74,158,245,0.12)" />
      <g stroke="#4A9EF5" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M62 20 C78 20 88 32 88 48" />
        <polyline points="80,42 88,48 82,56" />
        <path d="M88 52 C88 70 74 82 56 82" />
        <polyline points="62,76 56,84 48,78" />
        <path d="M44 82 C26 82 14 68 14 52" />
        <polyline points="20,58 14,52 22,44" />
        <path d="M14 48 C14 30 28 18 46 18" />
        <polyline points="40,24 46,18 52,26" />
      </g>
    </svg>
  )
}

/* ── Icons ────────────────────────────────────────────── */
function IconDownload({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}
function IconUsers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}
function IconCode() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  )
}
function IconChat() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}
function IconStar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}
