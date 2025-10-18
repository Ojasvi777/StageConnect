import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h4 className="footer-title">StageConnect</h4>
          <p>Empower performance with AI.</p>
        </div>
        <div>
          <h4 className="footer-title">Quick Links</h4>
          <ul>
            <li>About us</li>
            <li>Features</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div>
          <h4 className="footer-title">Legal</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
          </ul>
        </div>
        <div>
          <h4 className="footer-title">Connect</h4>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
