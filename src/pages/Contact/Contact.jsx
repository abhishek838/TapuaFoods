import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  Clock, 
  MessageSquare 
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import './Contact.css';

export const Contact = () => {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'Is Tapua Makhana raw or roasted?',
      a: 'Our signature Raw White Makhana is 100% RAW and UNROASTED. It is harvested from fresh wetland ponds, gently sun-dried and hand-popped, then packed without oils or artificial seasonings so you can roast or season it to your preference at home.'
    },
    {
      q: 'How does shipping and delivery work?',
      a: 'We offer FREE express shipping across India on all orders above ₹499. Orders are dispatched within 24–48 hours and typically delivered within 3–5 business days.'
    },
    {
      q: 'Do you offer bulk, corporate, or festive gift hampers?',
      a: 'Yes! We create bespoke festive and corporate hampers in handcrafted emerald and gold boxes with personalized message cards. Contact us directly via email at hello@tapuafoods.com for volume pricing.'
    },
    {
      q: 'How should I store Raw White Makhana?',
      a: 'Store your makhana in a cool, dry place away from direct sunlight. Once opened, transfer the contents to an airtight container to retain maximum crispness.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent! Our support team will reply within 24 hours.', 'success');
    setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <section className="contact-header">
        <div className="container">
          <span className="section-tag">
            <MessageSquare size={14} /> Here to Help
          </span>
          <h1 className="contact-title">We'd Love to Hear From You</h1>
          <p className="contact-subtitle">
            Have questions about our harvests, orders, or corporate gifting? Our dedicated care team is at your service.
          </p>
        </div>
      </section>

      {/* Grid: Info Cards + Contact Form */}
      <div className="container contact-main-grid">
        {/* Left: Contact Info Cards */}
        <div className="contact-info-col">
          <div className="contact-card">
            <div className="contact-icon-wrap">
              <Mail size={22} />
            </div>
            <div>
              <h3>Email Support</h3>
              <p>For order queries, assistance, or feedback:</p>
              <a href="mailto:hello@tapuafoods.com" className="contact-link">hello@tapuafoods.com</a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon-wrap">
              <Phone size={22} />
            </div>
            <div>
              <h3>Customer Helpline</h3>
              <p>Monday to Saturday, 9:00 AM – 6:00 PM IST</p>
              <a href="tel:+918002752517" className="contact-link">+91 80027 52517</a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon-wrap">
              <MapPin size={22} />
            </div>
            <div>
              <h3>Registered & Operational Address</h3>
              <p><strong>Registered Address:</strong> Chausa, Madhepura, Bihar, India</p>
              <p><strong>Primary Sourcing Hub:</strong> Mithila Region, Bihar</p>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="contact-form-col">
          <div className="contact-form-card">
            <h2>Send Us a Message</h2>
            <p className="form-subtext">Fill out the form below and we will respond promptly.</p>

            <form onSubmit={handleSubmit} className="support-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Abhishek Kumar"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Phone (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 80027 52517"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="form-input"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Status">Order Status & Tracking</option>
                    <option value="Bulk & Corporate Hampers">Bulk & Corporate Hampers</option>
                    <option value="Partnership / Wholesale">Wholesale Distribution</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Your Message *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="How can we assist you with our products or your order?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="form-input"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-lg submit-contact-btn">
                {submitted ? (
                  <>
                    <Check size={18} /> Message Sent
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <section id="faq" className="section faq-section">
        <div className="container faq-container">
          <div className="section-header">
            <span className="section-tag">
              <HelpCircle size={14} /> Quick Answers
            </span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Everything you need to know about our products, ordering, and delivery.
            </p>
          </div>

          <div className="faq-accordion">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`faq-card ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-question-btn"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="question-text">{faq.q}</span>
                    <ChevronDown size={20} className={`chevron-icon ${isOpen ? 'rotated' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="faq-answer-body animate-fade-in">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
