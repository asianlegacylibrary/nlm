import React, { useState, useEffect } from 'react'
import { constants } from '../../../store/_constants'
let { IIIFsuffix } = constants

export default ({ t, _img, _manifestURL }) => {
    const [showNotFound, setShowNotFound] = useState(false)

    useEffect(() => {
        let timer = setTimeout(() => setShowNotFound(true), 3000)
        return () => clearTimeout(timer)
    }, [])

    //SCANS button on the img itself
    let img = null
    let manifest = _manifestURL
        ? process.env.PUBLIC_URL + '/uv.html?manifest=' + _manifestURL
        : null
    if (_img === 'Not Found') {
        img = <div>{t('details.image-not-found')}</div>
    } else if (_img == null) {
        img = showNotFound ? (
            <div>{t('details.image-not-found')}</div>
        ) : (
            <div className="blinky">{t('technical.loading-image')}</div>
        )
    } else {
        if (manifest) {
            img = (
                <a
                    className="image item-link"
                    href={manifest}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        className="img-link"
                        src={`${_img}/${IIIFsuffix}`}
                        width="100%"
                        alt="scan"
                    />
                    <div className="content">View Scans</div>
                    <i className="reverse-content fa fa-eye" />
                </a>
            )
        } else {
            img = <img src={`${_img}/${IIIFsuffix}`} width="100%" alt="scan" />
        }
    }
    return img
}
// ;<span className="image down-push-s">
//     <Link
//         to={{ pathname: `/${lang}/archives` }}
//         className="item-link"
//         onClick={this.handleClick}
//     >
//         <img className="img-link" src={img} alt="" />
//         <div className="content">
//             Search the archives
//             {/* <div className="img-text">HI</div> */}
//         </div>
//     </Link>
// </span>
