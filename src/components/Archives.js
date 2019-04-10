import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withNamespaces } from 'react-i18next'

import Modal from './Modal'

import { 
    log, 
    IIIFsuffix, 
    fetchSpecificID, 
    fetchResources} from '../store/actions'

import '../assets/css/archives.css'

/* of interest 

// ID & Category
@id - bdr:...
type (Work, Person, Topic)

// LINKS 
creatorMainAuthor
workCreator
workGenre
workIsAbout (can be an array)
workHasPart (usually array)

// For any of these, check the @language
// TIBETAN bo-x-ewts
note.noteText['@value']
['skos:prefLabel']['@value'] && ['@language']
workTitle['rdfs:label'] (can be an array)

// ENGLISH (might be)
workBiblioNote
workCatalogInfo

*/
class Archives extends Component {

    // fetch ID from ES and show modal
    showModal = (doc_id, resources = null, imageURL = null) => {
        this.props.dispatch(fetchSpecificID(doc_id))
        this.props.dispatch(fetchResources(doc_id, resources))
        this.props.dispatch(
            { type: 'DETAIL_MODAL', modalID: doc_id, image: imageURL, show: true }
        )
    }

    // close modal and nullify the IIIF image so there's no flash
    // of previous image on next modal
    hideModal = () => {
        this.props.dispatch({ type: 'DETAIL_MODAL', show: false})
        this.props.dispatch({ type: 'NULLIFY_IIIF'})
    }

    // parse out the frontend index 
    // this index built specifically for UI
    // so that we can show values immediately, ie. The Buddha, not P809
    unpackFrontend = (code, o) => {
        if(code === 'P') {
            let p = null
            if(Array.isArray(o.data.personName)) {
                p = o.data.personName.find(p => p.type === 'PersonPrimaryName');
                p = p['rdfs:label']['@value']
            }
            //console.log('unpacking person', p)
            return p
        } else if(code === 'T') {
            let g = null
            if(Array.isArray(o.data['skos:prefLabel'])) {
                g = o.data['skos:prefLabel'].find(g => g['@language'] === 'en')
                g = g == null ? g = o.data['skos:prefLabel'].find(g => g['@language'] === 'bo-x-ewts') : g  
                g = g['@value']  
            } else if(typeof o.data['skos:prefLabel'] === 'object') {
                g = o.data['skos:prefLabel']['@value']
            }
            //console.log('unpacking topic', g)
            return g
        } else if(code === 'W') {
            console.log('I ended up in W', o)
        } else {
            return null
        }
    }

    // parse out json
    unpack = (arr) => {
        
        if(arr === null || arr === undefined) {
            return null
        } else if(Array.isArray(arr)) {
            return arr.map((a, i) => {
                // if it's an array of objects then recursion
                if(typeof a === 'object') {
                    return this.unpack(a)
                } else if(a.substring(0,3) === 'bdr') {
                    return (
                        <div key={i} className="card-sub-item">
                            <div>{a}</div>
                        </div> 
                    )
                } else {
                    return ( <div key={i} className="card-sub-item">{a}</div>)
                }
                
            })
        } else if (typeof arr === 'object') {
                
                if('key' in arr) {
                    // return ID string
                    if(arr.data.hasOwnProperty('@id')) {
                        return arr.data['@id']
                    } 
                    else {
                        // return a frontend index item
                        return this.unpackFrontend(arr.code, arr)
                    }
                
                } else if('noteText' in arr) {
                    return this.unpack(arr.noteText)

                // part of a language / value pair
                } else if(arr.hasOwnProperty('@value')) {
                    return arr['@value']
                } else {
                    // if you made it this far, it must be an rdfs item
                    return ( <span key={arr['rdfs:label']['@value']}>{arr['rdfs:label']['@value']}</span> )
                }
                
        } else if (typeof arr === 'string') {
            // if string begins with bdr then we assume its indexed
            if(arr.substring(0,3) === 'bdr') {
                return ( <div>{arr}</div> )
            } else {
                return (
                    <span>{arr}</span>
                )
            }
        }
    }

    getAuthorNames = (code) => {
        let n = null
        if(code === null || code === undefined) {
            return null
        } else if(Array.isArray(code)) {
            code = code[0]
        }
        try {
            const p = this.props.authors.find(p => code === p._id)
            if(p !== undefined) {
                if(Array.isArray(p._source.personName)) {
                    const nameArray = p._source.personName.find(n => "PersonPrimaryName" === n.type)
                    n = nameArray["rdfs:label"]["@value"]
                }
                else if(typeof p._source.personName === 'object') {
                    n = p._source.personName["rdfs:label"]["@value"]
                } 
            } else {
                n = null
            }
        } catch(error) {
            console.log('error in finding author name', error)
        }
        return n
    }

    getPrefLabel = (codes, dataType) => {
        let n = null
        let resources = null
        if(codes === null || codes === undefined) {
            return null
        } else if(Array.isArray(codes)) {
            codes = codes[0]
        }
        try {
            const p = this.props[dataType].find(p => codes === p._id)
            if(p !== undefined) {
                if('skos:prefLabel' in p._source) {
                    
                    if(Array.isArray(p._source["skos:prefLabel"])) {
                        if (p._source["skos:prefLabel"].some(l => l["@language"] === 'en')) {
                            n = p._source["skos:prefLabel"].find(t => "en" === t["@language"])
                            n = n["@value"]
                        } else if (p._source["skos:prefLabel"].some(l => l["@language"] === 'bo-x-ewts')) {
                            n = p._source["skos:prefLabel"].find(t => "bo-x-ewts" === t["@language"])
                            n = n["@value"]
                        }
                    } else if(typeof p._source["skos:prefLabel"] === 'object') {
                        n = p._source["skos:prefLabel"]["@value"]
                    }

                } else {
                    n = null
                }
                if('_resources' in p._source) {
                    resources = p._source._resources
                }
            }
        } catch(error) {
            console.error('getPrefLabel error in Archives component', error)
        }
        return { code: codes, label: n, resources: resources }
    }

    getImage = (URL) => {
        // const {
        //     region,
        //     size,
        //     rotation,
        //     qualityAndFormat
        // } = IIIFImageAPI
        // let imageURL = `${URL}/${region}/${size}/${rotation}/${qualityAndFormat}` 
        fetch(URL)
            .then(response => {
                log(response)
        }).catch(error => {
            console.error(error)
            //return null
            //return imageURL
        })
    }

    g = (URL) => {
        let image = null
        
        
        fetch(URL).then(resp => {
            if(resp.ok) {
                log(URL)
                image = `${URL}/${IIIFsuffix}`
                return image
            }
        })
        
    }

    render() {
        if(!this.props.authors.length) {
            return (
                <div className="blinky">LOADING</div>
            )
        }
        const items = this.props.works.map((work, i) => {
            //console.log(work)
            const { 
                'skos:prefLabel': label,
                '@id': id,
                'note': notes,
                workCreator,
                workIsAbout,
                _manifestURL,
                _firstImageURL,
                _resources
            } = work._source
            
            // get authors
            let authors = this.getPrefLabel(workCreator, "authors")

            // get subjects
            let subjects = this.getPrefLabel(workIsAbout, "subjects")

            let imageURL = _firstImageURL === "Not Found" 
                ? null 
                : `${_firstImageURL}/${IIIFsuffix}`
            
                // if(_firstImageURL !== "Not Found") {
            //     fetch(URL).then(resp => {
            //         if(resp.ok) {
            //             //log(URL)
            //             imageURL = 
            //         }
            //     })
            // }

            //let imageURL = _firstImageURL === "Not Found" ? null : this.g(_firstImageURL)
            //log('image URL is', imageURL)

            // CARD
            return (
                
                <div key={i} className="card">

                    <p className="meta-detail">{id}</p>

                    { imageURL == null ? null :
                    <div className="card-item card-item-img-link">
                        <div className="image-first-image-scan">
                            <img src={imageURL} alt="scan" width="100%" />
                        </div> 
                    </div> }

                    <div className="card-item">
                        <span className="item-work-label">Title: </span>
                        <span className="item-work">
                            <span
                                className="card-item-link"
                                key={id}
                                onClick={() => this.showModal(id, _resources, imageURL)}>
                                {this.unpack(label)}
                            </span>
                        </span>
                    </div>

                    

                    { authors == null ? null : 
                    <div className="card-item">
                        <span className="item-work-label">Author: </span>
                        <span className="item-work">
                            <span 
                                className="card-item-link"
                                key={authors.code}
                                onClick={() => this.showModal(authors.code, authors.resources)}>
                                {authors.label}
                            </span>
                        </span>
                    </div> }

                    { subjects == null ? null : 
                    <div className="card-item">
                        <span className="item-work-label">Subject: </span>
                        <span className="item-work">
                            <span
                                className="card-item-link"
                                key={subjects.code}
                                onClick={() => this.showModal(subjects.code, subjects.resources)}>
                                {subjects.label}
                            </span>
                        </span>
                    </div> }

                    

                    <p className="meta-detail">{this.unpack(notes)}</p>

                </div>
            )
        })
        // GRID
        return (
            <div className="grid">
                {items}
                <Modal 
                    key={this.props.doc_id}
                    hideModal={this.hideModal}
                    doc_id={this.props.doc_id} 
                    show={this.props.showModal}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    works: state.works.isFetching ? [] : state.works.items.hits.hits,
    authors: state.authors.isFetching ? [] : state.authors.items.hits.hits,
    subjects: state.topics.isFetching ? [] : state.topics.items.hits.hits,
    workDetail: state.detailData.isFetching || state.detailModal.modalID === 0 ? {} : state.detailData.item.hits.hits[0],
    doc_id: state.detailModal.modalID,
    showModal: state.detailModal.show,
    manifestURL: state.manifestData.isFetching ? '' : state.manifestData.manifestURL
})

const withN = new withNamespaces()(Archives)
export default connect(mapStateToProps)(withN)
