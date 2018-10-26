import React from 'react'

export const Footer = () => {
    return (
        <footer id="footer">
            <div className="icon">
              <img 
                src="http://206.189.71.52/wp-content/uploads/2018/10/nlm-logo-no-text.png" 
                alt="mongolia-logo" />
            </div>
            <ul className="alt-icons">
                <li><a href="#1" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                <li><a href="#1" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                <li><a href="#1" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
                <li><a href="#1" className="icon fa-github"><span className="label">GitHub</span></a></li>
                <li><a href="#1" className="icon fa-phone"><span className="label">Phone</span></a></li>
                <li><a href="#1" className="icon fa-envelope"><span className="label">Email</span></a></li>
            </ul>
            <ul className="menu">
                <li><a href="#1">Terms of Use</a></li>
                <li><a href="#1">Privacy Policy</a></li>
                <li><a href="#1">Contact Us</a></li>
            </ul>
            <p className="copyright">
                &copy; Untitled Corp. YO. All rights reserved. ACIP.
            </p>
        </footer>
    )
}

