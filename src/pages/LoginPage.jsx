import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import useAuthStore from '../store/authStore';
import styles from './AuthPage.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(form);
      const { token, user } = res.data;

      if (res.data.requires_otp) {
        navigate('/verify-otp', { state: { email: form.email, token } });
        return;
      }

      setAuth(user, token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message ?? 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoRow}>
          <span className={styles.logoMark}>T</span>
          <span className={styles.logoName}>TechTalk</span>
        </div>

        <h1 className={styles.heading}>Sign in</h1>
        <p className={styles.sub}>Welcome back.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className={styles.footer}>
          No account? <Link to="/register" className={styles.link}>Create one</Link>
        </p>
      </div>
    </div>
  );
}
