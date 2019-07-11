import React from 'react';

const Footer = () => {
  return (
    <div className="site-footer">
      <h4 className="text-center">
        Code Blog
      </h4>
      <p className="text-center">Follow us on social media</p>
      <div className="footer-social-links">
        <ul className="social-links-list">
          <li><a href="https://www.facebook.com" targer="_blank" rel="noopener noreferrer" className="facebook"> <i className="fa fa-facebook fa-2x"></i></a></li>
          <li><a href="https://www.facebook.com" targer="_blank" rel="noopener noreferrer" className="twitter"> <i className="fa fa-twitter fa-2x"></i></a></li>
          <li><a href="https://www.facebook.com" targer="_blank" rel="noopener noreferrer" className="linkedin"> <i className="fa fa-linkedin fa-2x"></i></a></li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;