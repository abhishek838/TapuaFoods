import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import logoImg from '../../assets/images/tapua-logo.png';
import './Login.css';

export const Login = () => {
  const [email, setEmail] = useState('abhishek.demo@tapuafoods.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/account';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      showToast('Signed in successfully!', 'success');
      navigate(from, { replace: true });
    } catch (err) {
      showToast('Login failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (forgotEmail) {
      setResetSuccess(true);
      setTimeout(() => {
        setForgotModalOpen(false);
        setResetSuccess(false);
        showToast('Password reset link sent to ' + forgotEmail, 'info');
      }, 1500);
    }
  };

  return (
    <div className="auth-page">
      <div className="container auth-container animate-fade-in">
        <div className="auth-card">
          <div className="auth-card-header">
            <Link to="/" className="auth-brand-logo">
              <img src={logoImg} alt="Tapua Foods Logo" />
            </Link>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">
              Sign in to manage your orders, wishlist, and fast checkout.
            </p>
            <div className="demo-auth-badge">
              <Sparkles size={13} />
              <span>Demo Authentication (Pre-filled for convenience)</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="loginEmail">Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  id="loginEmail"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-with-link">
                <label htmlFor="loginPassword">Password</label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="forgot-password-link"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  id="loginPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-full btn-lg auth-submit-btn"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="spinner" /> Authenticating...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer-prompt">
            <span>Don't have an account yet?</span>{' '}
            <Link to="/register" className="auth-switch-link">
              Create an Account
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="auth-modal-backdrop" onClick={() => setForgotModalOpen(false)}>
          <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Reset Password</h3>
            <p className="modal-desc">
              Enter your registered email and we'll send you instructions to reset your password.
            </p>

            {resetSuccess ? (
              <div className="reset-success-msg">
                <CheckCircle2 size={24} color="var(--color-success)" />
                <p>Mock reset link dispatched! Closing...</p>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="modal-form">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="auth-input"
                  style={{ marginBottom: '1rem' }}
                />
                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="btn btn-secondary btn-sm"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
