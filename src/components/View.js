import React from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader'
import Script from 'react-load-script'

const View = ({ wow, hidden}) => {

    return (
        <div style={{overflow:"hidden",textAlign:"center"}}>
        <div>
        
            [<div id="fondUV" className={hidden}> 
                 <Loader loaded={false} color="#fff"/>
              </div>,
              <div
              className={`uv toggled ${hidden}`}
              data-locale="en-GB:English (GB),cy-GB:Cymraeg"
              //data-config="/config.json"
              data-uri="https://eap.bl.uk/archive-file/EAP676-12-4/manifest"
              //data-uri={this.state.dataDetail.imageAsset}
              data-collectionindex="0"
              data-manifestindex="0"
              data-sequenceindex="0"
              data-fullscreen="true"
              data-canvasindex="0"
              data-zoom="-1.0064,0,3.0128,1.3791"
              data-rotation="0"
              style={{width:"0",height:"0",backgroundColor: "#000"}}
           />,
              <Script url={"http://universalviewer.io/uv/lib/embed.js"} />]
        </div>
        
     </div>
    )
}

const mapStateToProps = (state) => ({
    wow: "hello",
    hidden: ""
})

export default connect(mapStateToProps)(View)
