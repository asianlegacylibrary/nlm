import React from 'react'
import { connect } from 'react-redux'

import Script from 'react-load-script'
//import IIIFViewerContainer from '../containers/IIIFViewerContainer';
import Loader from 'react-loader'

const parseType = (source, hideModal) => {
    let { 
        'workHasItemImageAsset': imageAsset,
        'workHasItem': volumeAsset,
        'workNumberOfVolumes': volumes
    } = source

    let imageURL = ''
    const iiifpres = "http://iiifpres.bdrc.io" ;
    
    if(imageAsset) {
        if(volumes === 1) {
            // must reconstruct imageItem based on workHasItem > hasVolume
            // bdr:W22677
            // W22677 > workHasItem > bdr:I22677 > HasVolume > V22677_I1KG1714
            // BDRC "http://iiifpres.bdrc.io/2.1.1/v:bdr:V22677_I1KG1714/manifest"
            imageURL = `${iiifpres}/2.1.1/v:${imageAsset}/manifest`
            imageURL = ``
        } else if(volumes > 1) {
            // bdr:W1GS135873
            // ACIP http://iiifpres.bdrc.io/2.1.1/collection/i:bdr:bdr:I1KG1132
            // BDRC "http://iiifpres.bdrc.io/2.1.1/collection/i:bdr:I1GS135873"
            imageURL = `${iiifpres}/2.1.1/collection/i:${imageAsset}`
        }
    }
    console.log(imageAsset, volumeAsset, imageURL);
    return imageURL
    // if(imageURL.length === 0) {
    //     console.log('no image YET!')
    // } else {

    // }

}

const UniversalViewer = ({ hideViewer, doc_id, showViewer }) => {
    //console.log('props from MODAL', workDetail)

    let hidden = showViewer ? "" : "hide"
    // [<div id="fondUV" className={(this.state.hideUV?"hide":"")}>
    // className={"uv "+(this.state.toggleUV?"toggled ":"")+(this.state.hideUV?"hide":"")}
    
    
    return ( 
        
        <div 
            
            onClick={hideViewer}
            style={{overflow:"hidden",textAlign:"center"}}>
            
        
            [
                {/* <div id="fondUV" className={hidden}> 
                    <Loader loaded={false} color="#fff"/>
                </div>, */}
                <div
                onClick={hideViewer}
                className={`uv ${hidden}`}
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
            >
            </div>
            ,
            <div className="z">CLOSE</div>
            ,
              <Script url={"http://universalviewer.io/uv/lib/embed.js"} />]
        </div>
        
    )

}

const mapStateToProps = (state) => ({
    showViewer: state.universalViewer.showViewer,
    //workDetail: state.detailData.isFetching || state.detailModal.modalID === 0 ? {} : state.detailData.item.hits.hits[0],
    //image: state.detailData.isFetching ? '' : state.dataDetail.imageAsset
    //workDetail: state.detailData.isFetching || state.detailModal.modalID === 0 ? {} : state.detailData.item.hits.hits[0]
});

export default connect(mapStateToProps)(UniversalViewer)
