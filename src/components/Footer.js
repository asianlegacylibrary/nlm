import React from 'react'
import { withNamespaces } from 'react-i18next'
import { onlyIP, buildYear } from '../store/actions'

import '../assets/css/footer.css'

const Footer = (props) => {
    return (
        <footer id="footer">
            <div className="icon">
              <img 
                src={`http://${onlyIP}/wp-content/uploads/2018/10/nlm-logo-no-text.png`} 
                alt="mongolia-logo" />
            </div>
            {/* <ul className="alt-icons">
                <li><a href="#1" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                <li><a href="#1" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                <li><a href="#1" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
                <li><a href="#1" className="icon fa-github"><span className="label">GitHub</span></a></li>
                <li><a href="#1" className="icon fa-phone"><span className="label">Phone</span></a></li>
                <li><a href="#1" className="icon fa-envelope"><span className="label">Email</span></a></li>
            </ul> */}
            <ul className="menu">
                <li>
                    <a 
                        href="mailto:info@asianclassics.org"
                        target="_blank"
                        rel="noopener noreferrer">
                            {props.t('footer.contact')}
                    </a>
                </li>
                <li>
                    <a 
                        href="http://nationallibrary.mn/mn/"
                        target="_blank"
                        rel="noopener noreferrer">
                            {props.t('footer.library-site')}
                    </a>
                </li>
                <li>
                    <a 
                        href="http://178.128.7.239/wp-login.php" 
                        target="_blank" 
                        rel="noopener noreferrer">
                            {props.t('footer.login')}
                    </a>
                </li>
            </ul>
            <p className="copyright">
                &copy; {`${buildYear} ${props.t('title')}. ${props.t('footer.rights')}.`}
            </p>
        </footer>
    )
}

export default withNamespaces()(Footer)

