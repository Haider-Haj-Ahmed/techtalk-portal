import { useEffect, useRef } from 'react'
import s from './App.module.css'

const APK_URL = 'https://github.com/Haider-Haj-Ahmed/techtalk-portal/releases/download/v1.0.0/techtalk.apk'

const FEATURES = [
  {
    icon: <IconUsers />,
    label: 'Community',
    desc: 'Follow developers, discover what they\'re building, and grow your network organically.',
  },
  {
    icon: <IconCode />,
    label: 'Code',
    desc: 'Share snippets, write technical blogs, and get real feedback from real engineers.',
  },
  {
    icon: <IconChat />,
    label: 'Discuss',
    desc: 'Threaded conversations with @mentions, nested replies, and rich reactions.',
  },
  {
    icon: <IconStar />,
    label: 'Earn XP',
    desc: 'Every post, comment, and reaction levels you up. Unlock badges. Build your rep.',
  },
]

const STEPS = [
  { num: '01', title: 'Download the app', desc: 'Free APK, no Play Store needed. Install in seconds.' },
  { num: '02', title: 'Create your profile', desc: 'Pick a username, write a bio, link your socials.' },
  { num: '03', title: 'Join the conversation', desc: 'Post, react, comment — start earning XP from day one.' },
]

export default function App() {
  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.dataset.visible = 'true'
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className={s.page}>

      {/* NAV */}
      <nav className={s.nav}>
        <div className={s.navLogo}>
          <TechTalkIcon size={28} />
          <span className={s.navBrand}>Tech Talk</span>
        </div>
        <a href="#download" className={s.navCta}>
          <DownloadIcon size={14} />
          Get the app
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className={s.hero}>
        <div className={s.heroGlow} aria-hidden />

        <div className={s.heroContent}>
          <div className={s.badge}>
            <span className={s.badgeDot} />
            Android · v1.0.0 · Free
          </div>

          <h1 className={s.heroTitle}>
            Where developers<br />
            <span className={s.heroAccent}>come together</span>
          </h1>

          <p className={s.heroSub}>
            Tech Talk is the mobile-first community built for developers.
            Post your work, discuss ideas, follow people you admire,
            and level up — all in one place.
          </p>

          <div className={s.heroCtas} id="download">
            <a href={APK_URL} download className={s.dlBtn}>
              <DownloadIcon size={18} />
              <span className={s.dlBtnText}>
                <span className={s.dlBtnSub}>Free download</span>
                <span className={s.dlBtnMain}>Get the APK</span>
              </span>
              <span className={s.dlBadge}>Android</span>
            </a>
            <p className={s.dlNote}>No account required to browse</p>
          </div>
        </div>

        <div className={s.heroPhones}>
          <PhoneMockup variant="side" delay={120} />
          <PhoneMockup variant="main" delay={0} featured />
          <PhoneMockup variant="side2" delay={200} />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className={s.features}>
        <div data-reveal className={s.revealBlock}>
          <p className={s.eyebrow}>Everything you need</p>
          <h2 className={s.sectionTitle}>Built for the dev community</h2>
          <p className={s.sectionSub}>
            From short-form posts to long-form blogs, quick reactions to deep threads —
            Tech Talk gives developers the tools to share what they know.
          </p>
        </div>

        <div className={s.featuresGrid}>
          {FEATURES.map((f, i) => (
            <div
              key={f.label}
              className={s.featureCard}
              data-reveal
              style={{ '--delay': `${i * 90}ms` }}
            >
              <div className={s.featureIcon}>{f.icon}</div>
              <h3 className={s.featureLabel}>{f.label}</h3>
              <p className={s.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className={s.steps}>
        <div data-reveal className={s.revealBlock}>
          <p className={s.eyebrow}>Get started in minutes</p>
          <h2 className={s.sectionTitle}>Up and running in three steps</h2>
        </div>

        <div className={s.stepsGrid}>
          {STEPS.map((st, i) => (
            <div
              key={st.num}
              className={s.stepCard}
              data-reveal
              style={{ '--delay': `${i * 100}ms` }}
            >
              <span className={s.stepNum}>{st.num}</span>
              <h3 className={s.stepTitle}>{st.title}</h3>
              <p className={s.stepDesc}>{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className={s.ctaBand} data-reveal>
        <div className={s.ctaGlow} aria-hidden />
        <TechTalkIcon size={52} />
        <h2 className={s.ctaTitle}>Ready to join?</h2>
        <p className={s.ctaSub}>
          Download Tech Talk and start building your developer presence today.
          It's free, it's fast, and your community is waiting.
        </p>
        <a href={APK_URL} download className={s.dlBtn}>
          <DownloadIcon size={18} />
          <span className={s.dlBtnText}>
            <span className={s.dlBtnSub}>Free download</span>
            <span className={s.dlBtnMain}>Get the APK</span>
          </span>
          <span className={s.dlBadge}>Android</span>
        </a>
      </section>

      {/* FOOTER */}
      <footer className={s.footer}>
        <div className={s.footerLogo}>
          <TechTalkIcon size={20} />
          <span>Tech Talk</span>
        </div>
        <p className={s.footerCopy}>© {new Date().getFullYear()} Tech Talk. All rights reserved.</p>
      </footer>
    </div>
  )
}

/* ── Phone mockup ─────────────────────────────────────── */
function PhoneMockup({ featured, delay, variant }) {
  return (
    <div
      className={`${s.phone} ${featured ? s.phoneFeatured : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={s.phoneFrame}>
        <div className={s.phoneNotch} />
        <div className={s.phoneScreen}>
          <PhoneScreen variant={variant} />
        </div>
      </div>
    </div>
  )
}

function PhoneScreen({ variant }) {
  if (variant === 'main') {
    return (
      <div className={s.screenMain}>
        {/* Simulated splash */}
        <div className={s.screenSplashGlow} aria-hidden />
        <TechTalkIcon size={48} />
        <p className={s.screenAppName}>Tech Talk</p>
        <p className={s.screenVersion}>v 1.0.0</p>
        <div className={s.screenBar}><div className={s.screenBarFill} /></div>
      </div>
    )
  }
  if (variant === 'side') {
    return (
      <div className={s.screenFeed}>
        <div className={s.screenFeedHeader}>
          <div className={s.screenAvatar} />
          <div className={s.screenLines}>
            <div className={`${s.screenLine} ${s.screenLineMd}`} />
            <div className={`${s.screenLine} ${s.screenLineSm}`} />
          </div>
        </div>
        {[80, 60, 90, 50].map((w, i) => (
          <div key={i} className={s.screenLine} style={{ width: `${w}%`, marginBottom: 6 }} />
        ))}
        <div className={s.screenReactions}>
          <div className={s.screenReact}>♥ 12</div>
          <div className={s.screenReact}>◆ 4</div>
          <div className={s.screenReact}>◎ 7</div>
        </div>
      </div>
    )
  }
  return (
    <div className={s.screenProfile}>
      <div className={s.screenProfileAvatar} />
      <div className={s.screenProfileName} />
      <div className={s.screenBadge}>expert</div>
      <div className={s.screenXpBar}><div className={s.screenXpFill} /></div>
      <div className={s.screenStats}>
        <div className={s.screenStat}><span>12</span><span>posts</span></div>
        <div className={s.screenStat}><span>84</span><span>followers</span></div>
        <div className={s.screenStat}><span>3</span><span>blogs</span></div>
      </div>
    </div>
  )
}

/* ── Logo ─────────────────────────────────────────────── */
function TechTalkIcon({ size = 28 }) {
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
function DownloadIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}
function IconUsers() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}
function IconCode() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
}
function IconChat() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
}
function IconStar() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
