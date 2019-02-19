import React from 'react'
import { withNamespaces } from 'react-i18next'
import { onlyIP, buildYear } from '../actions'

const Footer = (props) => {
    return (
        <footer id="footer">
            <div className="icon">
              <img 
                src={`http://${onlyIP}/wp-content/uploads/2018/10/nlm-logo-no-text.png`} 
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
                <li><a href="#1">{props.t('footer.terms')}</a></li>
                <li><a href="#1">{props.t('footer.privacy')}</a></li>
                <li><a href="#1">{props.t('footer.contact')}</a></li>
            </ul>
            <p className="copyright">
                &copy; {`${buildYear} ${props.t('title')}. ${props.t('footer.rights')}.`}
            </p>
        </footer>
    )
}

export default withNamespaces()(Footer)

