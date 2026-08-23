import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';
import styles from './AuthPage.module.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', password_confirmation: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setLoading(true);
    try {
      const res = await register(form);
      navigate('/verify-otp', { state: { email: form.email, token: res.data.token } });
    } catch (err) {
      if (err.response?.status === 422) {
        setFieldErrors(err.response.data.errors ?? {});
      } else {
        setError(err.response?.data?.message ?? 'Registration failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const field = (name, label, type = 'text', autoComplete) => (
    <label className={styles.label}>
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={form[name]}
        onChange={handleChange}
        className={`${styles.input} ${fieldErrors[name] ? styles.inputError : ''}`}
        required
      />
      {fieldErrors[name] && (
        <span className={styles.fieldError}>{fieldErrors[name][0]}</span>
      )}
    </label>
  );

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoRow}>
          <span className={styles.logoMark}>T</span>
          <span className={styles.logoName}>TechTalk</span>
        </div>

        <h1 className={styles.heading}>Create account</h1>
        <p className={styles.sub}>Join the conversation.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {field('name',     'Full name',            'text',     'name')}
          {field('username', 'Username',             'text',     'username')}
          {field('email',    'Email',                'email',    'email')}
          {field('password', 'Password',             'password', 'new-password')}
          {field('password_confirmation', 'Confirm password', 'password', 'new-password')}

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className={styles.footer}>
          Already a member? <Link to="/login" className={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
