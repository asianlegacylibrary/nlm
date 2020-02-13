import React from 'react'
export default (t, manifestURL) => {
    let btn = null
    if (manifestURL == null) {
        return null
    }
    if (manifestURL !== undefined) {
        //window.localStorage.setItem("manifestURL", this.props.manifestURL)
        if (manifestURL.length === 0) {
            //window.localStorage.setItem("manifestURL", "")
            btn = null
        } else {
            btn = (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                        process.env.PUBLIC_URL +
                        '/uv.html?manifest=' +
                        manifestURL
                    }
                >
                    <button>
                        <i className="fa fa-2x fa-eye"></i> {t('modal.scans')}
                    </button>
                </a>
            )
        }
    }
    return btn
}
