import React, { useState } from 'react';
import '../Styles/Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    // Use the 'mailto' protocol to open the user's default email client
    const subject = encodeURIComponent('Newsletter Subscription');
    const body = encodeURIComponent(`A new user has subscribed with the email: ${email}`);
    window.location.href = `mailto:joacimodhiambo@gmail.com?subject=${subject}&body=${body}`;

    setEmail(''); // Clear the input after sending
  };

  return (
    <footer>
      <div className="newsletter-section">
        <h3>Subscribe to our Newsletter</h3>
        <form onSubmit={handleSubscribe} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <hr className="footer-line" />
      <p>2024, Maximum Health. All Rights Reserved.</p>
    </footer>
  );
}
