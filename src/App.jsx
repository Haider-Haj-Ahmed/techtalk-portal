import styles from './App.module.css'

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: 'Community',
    desc: 'Connect with developers worldwide and grow together',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    label: 'Code',
    desc: 'Share snippets, review code, and learn from each other',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    label: 'Discuss',
    desc: 'Start and join conversations that matter to you',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    label: 'Earn XP',
    desc: 'Level up and earn badges as you contribute and engage',
  },
]

const APK_URL = 'https://github.com/Haider-Haj-Ahmed/techtalk-portal/releases/download/v1.0.0/techtalk.apk'

export default function App() {
  return (
    <div className={styles.page}>
      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <TechTalkIcon />
          <span>Tech Talk</span>
        </div>
        <a href="#download" className={styles.navCta}>Get the app</a>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden />
        <div className={styles.heroContent}>
          <div className={styles.badge}>Now available</div>
          <h1 className={styles.heroTitle}>
            Where developers<br />
            <span className={styles.heroAccent}>come together</span>
          </h1>
          <p className={styles.heroSub}>
            The first platform that brings developers together in one interactive community.
            Share, learn, and grow — all in your pocket.
          </p>
          <div className={styles.heroCtas} id="download">
            <DownloadButton />
          </div>
        </div>

        <div className={styles.heroPhones}>
          <PhoneMockup screen="screen3" delay="0" />
          <PhoneMockup screen="screen1" delay="80" featured />
          <PhoneMockup screen="screen2" delay="160" />
        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.features}>
        <p className={styles.featuresEyebrow}>Everything you need</p>
        <h2 className={styles.featuresTitle}>Built for the dev community</h2>
        <div className={styles.featuresGrid}>
          {FEATURES.map(f => (
            <div key={f.label} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureLabel}>{f.label}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className={styles.ctaBand}>
        <div className={styles.ctaGlow} aria-hidden />
        <TechTalkIcon size={48} />
        <h2 className={styles.ctaTitle}>Ready to join?</h2>
        <p className={styles.ctaSub}>Download Tech Talk and start your journey today.</p>
        <div className={styles.heroCtas}>
          <DownloadButton />
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <TechTalkIcon size={20} />
          <span>Tech Talk</span>
        </div>
        <p className={styles.footerCopy}>© {new Date().getFullYear()} Tech Talk. All rights reserved.</p>
      </footer>
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────── */

function TechTalkIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Recycling-arrows logo approximated from the screenshots */}
      <circle cx="50" cy="50" r="48" fill="rgba(74,158,245,0.15)" />
      <g stroke="#4A9EF5" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Top-right arrow */}
        <path d="M62 20 C78 20 88 32 88 48" />
        <polyline points="80,42 88,48 82,56" />
        {/* Bottom arrow */}
        <path d="M88 52 C88 70 74 82 56 82" />
        <polyline points="62,76 56,84 48,78" />
        {/* Left arrow */}
        <path d="M44 82 C26 82 14 68 14 52" />
        <polyline points="20,58 14,52 22,44" />
        {/* Top-left to top */}
        <path d="M14 48 C14 30 28 18 46 18" />
        <polyline points="40,24 46,18 52,26" />
      </g>
    </svg>
  )
}

function DownloadButton() {
  return (
    <a href={APK_URL} download className={styles.downloadBtn}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Download for Android
      <span className={styles.downloadBadge}>APK</span>
    </a>
  )
}

function PhoneMockup({ screen, delay, featured }) {
  // Using the uploaded screenshots mapped by position
  const screenMap = {
    screen1: '/screen3.png',  // splash
    screen2: '/screen2.png',  // onboarding
    screen3: '/screen1.png',  // profile
  }
  return (
    <div
      className={`${styles.phone} ${featured ? styles.phoneFeatured : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={styles.phoneFrame}>
        <div className={styles.phoneNotch} />
        <div className={styles.phoneScreen}>
          {/* Gradient placeholder — replace with real screenshots once hosted */}
          <div className={styles.phoneScreenInner} />
        </div>
      </div>
    </div>
  )
}
