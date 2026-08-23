import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp, resendOtp } from '../api/auth';
import useAuthStore from '../store/authStore';
import styles from './AuthPage.module.css';

export default function OtpPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const inputs = useRef([]);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const code = otp.join('');
    try {
      const res = await verifyOtp({ email: state?.email, otp: code, token: state?.token });
      setAuth(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message ?? 'Invalid code.');
      setOtp(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email: state?.email });
      setResent(true);
      setTimeout(() => setResent(false), 4000);
    } catch {/* silent */}
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoRow}>
          <span className={styles.logoMark}>T</span>
          <span className={styles.logoName}>TechTalk</span>
        </div>

        <h1 className={styles.heading}>Verify your email</h1>
        <p className={styles.sub}>
          We sent a 6-digit code to <strong>{state?.email}</strong>
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.otpRow}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={styles.otpInput}
                autoFocus={i === 0}
              />
            ))}
          </div>

          {error && <p className={styles.error}>{error}</p>}
          {resent && <p className={styles.success}>Code resent.</p>}

          <button type="submit" className={styles.submit} disabled={loading || otp.join('').length < 6}>
            {loading ? 'Verifying…' : 'Verify'}
          </button>
        </form>

        <p className={styles.footer}>
          Didn't receive it?{' '}
          <button className={styles.link} onClick={handleResend}>Resend code</button>
        </p>
      </div>
    </div>
  );
}
