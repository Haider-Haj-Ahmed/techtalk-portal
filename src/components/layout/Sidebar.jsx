import { NavLink } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useNotifStore from '../../store/notifStore';
import styles from './Sidebar.module.css';

const NAV = [
  { to: '/', label: 'Feed', icon: '⬡' },
  { to: '/explore', label: 'Explore', icon: '◎' },
  { to: '/bookmarks', label: 'Bookmarks', icon: '◈' },
  { to: '/notifications', label: 'Notifications', icon: '◉', badge: true },
  { to: '/write', label: 'Write', icon: '✦' },
];

export default function Sidebar() {
  const { user, isAuthenticated } = useAuthStore();
  const unreadCount = useNotifStore((s) => s.unreadCount);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandMark}>T</span>
        <span className={styles.brandName}>TechTalk</span>
      </div>

      <nav className={styles.nav}>
        {NAV.map(({ to, label, icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
            end={to === '/'}
          >
            <span className={styles.navIcon}>{icon}</span>
            <span className={styles.navLabel}>{label}</span>
            {badge && unreadCount > 0 && (
              <span className={styles.badge}>{unreadCount > 99 ? '99+' : unreadCount}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className={styles.bottom}>
        {isAuthenticated && user ? (
          <NavLink to={`/u/${user.username}`} className={styles.userCard}>
            <div className={styles.avatar}>
              {user.avatar
                ? <img src={user.avatar} alt={user.name} />
                : <span>{user.name?.[0]?.toUpperCase()}</span>}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userHandle}>@{user.username}</span>
            </div>
          </NavLink>
        ) : (
          <NavLink to="/login" className={styles.signIn}>Sign in</NavLink>
        )}
      </div>
    </aside>
  );
}
