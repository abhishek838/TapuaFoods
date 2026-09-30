import React, { useState } from 'react';
import { X, Bell, Check, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import './NotifyModal.css';

export const NotifyModal = ({ product, isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useToast();

  if (!isOpen || !product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubmitted(true);
      showToast(`You're on the VIP list for ${product.name}!`, 'success');
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="notify-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="notify-modal" onClick={(e) => e.stopPropagation()}>
        <button className="notify-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="notify-icon-circle">
          <Bell size={24} />
        </div>

        <div className="notify-eyebrow">
          <Sparkles size={14} />
          <span>PRE-LAUNCH VIP LIST</span>
        </div>

        <h3 className="notify-title">{product.name}</h3>

        <p className="notify-desc">
          We are currently hand-crafting small trial batches in our Mithila facility. Be the very first to know the minute this flavor drops and get an exclusive <strong>15% launch privilege code</strong>.
        </p>

        {isSubmitted ? (
          <div className="notify-success-box">
            <Check size={20} className="check-icon" />
            <span>Thank you! We have added {email} to the early access list.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="notify-form">
            <input 
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="notify-input"
            />
            <button type="submit" className="btn btn-primary btn-notify-submit">
              Notify Me on Launch
            </button>
          </form>
        )}

        <span className="notify-privacy-note">Zero spam. Only fresh harvest and drop alerts.</span>
      </div>
    </div>
  );
};
