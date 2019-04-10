import { log } from './index'
import { searchByID } from '../queries'
import * as types from './types'

const iiifpres = "http://iiifpres.bdrc.io"

export function fetchManifest(imageAsset, volumes) {
    return dispatch => {
        log('INSIDE fetchManifest', imageAsset)
        dispatch(requestManifest())
        try {
            let imageURL
            
            if(imageAsset) {
                //const id = imageAsset.includes(":") ? imageAsset.split(":")[1] : imageAsset
                if(volumes === 1) {
                    // must reconstruct imageItem based on workHasItem > hasVolume
                    // bdr:W22677
                    // W22677 > workHasItem > bdr:I22677 > HasVolume > V22677_I1KG1714
                    // BDRC "http://iiifpres.bdrc.io/2.1.1/v:bdr:V22677_I1KG1714/manifest"
                    searchByID([imageAsset], 1, imageAsset.charAt(4), true).then((dataDetail) => {
                        log('THEN', dataDetail)
                        try {
                            const volumeID = dataDetail.hits.hits[0]._source.itemHasVolume
                            imageURL = `${iiifpres}/2.1.1/v:${volumeID}/manifest`
                            log('THIS IS IMAGE URL', imageURL)
                            dispatch(fetchIIIF(imageURL))
                            return dispatch(receiveManifest(imageURL))
                        } catch(error) {
                            console.error("image URL not found", error)
                        }
                        
                    })
                } else if(volumes > 1) {
                    // bdr:W1GS135873
                    // BDRC "http://iiifpres.bdrc.io/2.1.1/collection/i:bdr:I1GS135873"
                    imageURL = `${iiifpres}/2.1.1/collection/i:${imageAsset}`
                    log('THIS IS IMAGE URL', imageURL)
                    dispatch(fetchIIIF(imageURL))
                    return dispatch(receiveManifest(imageURL))
                }
            } else {
                return dispatch(receiveManifest(''))
            }
        } catch (error) {
            console.error('fetch manifest error! ', error)
        }
    }
}


function receiveManifest(manifestURL) {
    return {
        type: types.RECEIVE_MANIFEST,
        manifestURL,
        receivedAt: Date.now()
    }
}

function requestManifest() {
    log('requesting manifest!')
    return {
        type: types.REQUEST_MANIFEST
    }
}

export const modalDetail = (modalID, show) => ({
    type: types.DETAIL_MODAL,
    modalID: modalID,
    show: show
})


function receiveIIIF(firstImage) {
    return {
        type: types.RECEIVE_IIIF,
        firstImage,
        receivedAt: Date.now()
    }
}

function requestIIIF() {
    log('requesting IIIF!')
    return {
        type: types.REQUEST_IIIF,
        firstImage: null
    }
}

export function fetchIIIF(url) {
    return dispatch => {
        dispatch(requestIIIF())
        try {
            // first image
            //http://iiif.bdrc.io/image/v2/bdr:V22677_I1KG1714::I1KG17140003.jpg/full/,600/0/default.jpg"
            // imageAsset
            // http://iiifpres.bdrc.io/2.1.1/v:bdr:V22677_I1KG1714/manifest"
            // http://iiifpres.bdrc.io/2.1.1/v:bdr:V22677_I1KG1714/manifest
            
            fetch(url, {method: 'GET'}).then((manifest) => {
                return manifest.json()
            }).then(data => {
                let image
                log(data.status)
                if(data.status === 404) {
                    image = data.message
                    return dispatch(receiveIIIF(image))
                }
                

                //collection ?
                if(!data.sequences ) {
                    if (data.manifests) {
                        log('I AM A COLLECTION')
                        dispatch(fetchIIIF(data.manifests[0]["@id"]))
                    }
                }
                // this logic taken directly from ResourceViewer BDRC
                if(data.sequences && data.sequences[0] && data.sequences[0].canvases) {
                    let found = false
                    for(let i in data.sequences[0].canvases){
                        let s = data.sequences[0].canvases[i]
                        if(s.label === "tbrc-1") {
                            s = data.sequences[0].canvases[2]
                            if(s && s.images && s.images[0]) {
                                image = data.sequences[0].canvases[2].images[0].resource["@id"]
                                found = true ;
                                return dispatch(receiveIIIF(image))
                            }
                        }
                    }

                    if(!found) {
                        if(data.sequences[0].canvases[0] 
                            && data.sequences[0].canvases[0].images[0] 
                            && data.sequences[0].canvases[0].images[0].resource["@id"]) {
                            
                            image = data.sequences[0].canvases[0].images[0].resource["@id"]
                            found = true
                            return dispatch(receiveIIIF(image))
                        }
                    }
                }
            })
        }
        catch(e) {
            console.error('config error', e)
        }
    }
}