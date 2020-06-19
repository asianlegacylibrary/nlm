import '../assets/sass/nlm/footer.scss'
import React from 'react'
import { withNamespaces } from 'react-i18next'
import { constants } from '../store/_constants'
import nlm_full from '../assets/images/nlm_logo_full_transparent.png'

let { buildYear, links } = constants

const Footer = ({ t }) => {
    return (
        <footer className="page-footer">
            <div className="container">
                <div className="row">
                    <div className="col m6 s12">
                        <div className="icon">
                            <img
                                src={nlm_full}
                                height="140px"
                                alt="mongolia-logo"
                            />
                        </div>
                    </div>
                    <div className="col m4 offset-l2 s12">
                        <h5 className="white-text">Links</h5>
                        <ul>
                            <li>
                                <a
                                    href={links.acipEmail}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('footer.contact')}
                                </a>
                            </li>

                            <li>
                                <a
                                    href={links.nlmSite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('footer.library-site')}
                                </a>
                            </li>

                            <li>
                                <a
                                    href={links.wpAdmin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('footer.login')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-copyright">
                &copy; {`${buildYear} ${t('title')}. ${t('footer.rights')}.`}
            </div>
        </footer>
    )
}

export default withNamespaces()(Footer)
