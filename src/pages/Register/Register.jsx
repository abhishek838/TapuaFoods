import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import logoImg from '../../assets/images/tapua-logo.png';
import '../Login/Login.css';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      showToast('Please fill in all mandatory fields.', 'error');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      showToast('Account registered successfully! Welcome to Tapua Foods.', 'success');
      navigate('/account');
    } catch (err) {
      showToast('Registration failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
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
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">
              Join the Tapua Foods family for fresh harvest updates and members-only perks.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="regName">Full Name *</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  id="regName"
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Abhishek Kumar"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="auth-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="regEmail">Email Address *</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  id="regEmail"
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="auth-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="regPhone">Mobile Number (Optional)</label>
              <div className="input-with-icon">
                <Phone size={18} className="input-icon" />
                <input
                  id="regPhone"
                  type="tel"
                  name="phone"
                  placeholder="+91 80027 52517"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="auth-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="regPassword">Password *</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  id="regPassword"
                  type="password"
                  name="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="auth-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="regConfirmPassword">Confirm Password *</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  id="regConfirmPassword"
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
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
                  <Loader2 size={18} className="spinner" /> Registering...
                </>
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer-prompt">
            <span>Already have an account?</span>{' '}
            <Link to="/login" className="auth-switch-link">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
