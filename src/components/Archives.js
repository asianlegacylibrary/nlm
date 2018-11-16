import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchSpecificID } from '../actions'

import Modal from './Modal'

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

    showModal = (doc_id) => {
        //fetchSpecificID(doc_id)
        this.props.dispatch(fetchSpecificID(doc_id))
        this.props.dispatch(
            { type: 'DETAIL_MODAL', modalID: doc_id, show: true }
        )
    }

    hideModal = () => {
        //this.setState({ show: false });
        this.props.dispatch({ type: 'DETAIL_MODAL', show: false})
    }

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

    unpack = (arr) => {
        if(arr === null || arr === undefined) {
            return null
        } else if(Array.isArray(arr)) {
            return arr.map((a, i) => {
                if(typeof a === 'object') {
                    return this.unpack(a)
                } else if(a.substring(0,3) === 'bdr') {
                    return (
                        <div key={i} className="card-sub-item">
                            {/* <a onClick={() => this.handleClick(a.split(":")[1])} href={a}>{a}</a> */}
                            <a onClick={() => this.showModal(a.split(":")[1])} href={a}>{a}</a>
                        </div> 
                    )
                } else {
                    return ( <div key={i} className="card-sub-item">{a}</div>)
                }
                
            })
        } else if (typeof arr === 'object') {
                if('key' in arr) {
                    
                    if(arr.data.hasOwnProperty('@id')) {
                        return arr.data['@id']
                    } 
                    else {
                        return this.unpackFrontend(arr.code, arr)
                    }        
                } else if(arr.hasOwnProperty('@value')) {
                    return arr['@value']
                } else {
                    return ( <span key={arr['rdfs:label']['@value']}>{arr['rdfs:label']['@value']}</span> )
                }
                
        } else if (typeof arr === 'string') {
                if(arr.substring(0,3) === 'bdr') {
                    return ( <a onClick={() => this.showModal(arr.split(":")[1])} href={arr}>{arr}</a> )
        } else {
            return (
                <span>{arr}</span>
            )
        }
    }
}

    render() {
        
        const items = this.props.works.map((work, i) => {

            const { 
                'skos:prefLabel': label,
                '@id': id,
                // 'creatorMainAuthor': author,
                //'workCreator': creator,
                'workGenre': genre,
                'workIsAbout': topic,
                //'workTitle': title,
                //'workHasPart': parts 
            } = work._source

            const author = work._source.creatorMainAuthor !== undefined ? work._source.creatorMainAuthor : null 
            const authorCode = author !== null ? author.item : null
            //console.log('AUTHOR', author)

            // CARD
            return (
                
                <div key={i} className="card">
                    <div className="card-item">
                        <span className="item-work"> 
                            { this.unpack(label) }
                        </span>
                    </div>

                    {/* <div className="card-item">
                        <span className="item-lead">Title:</span>
                        <span> { this.unpack(title) }</span>
                    </div> */}

                    <div className="card-item">
                        <span className="item-lead">Author: </span> 
                        <span className="item-btn" onClick={() => this.showModal(authorCode)} href={authorCode}>
                                { this.unpack(author) }
                        </span>
                    </div>
                    <div className="card-item">
                        <span className="item-lead">Genre:</span> 
                        <span> { this.unpack(genre) }</span>
                    </div>
                    <div className="card-item">
                        <span className="item-lead">Topic:</span> 
                        <span> { this.unpack(topic) }</span>
                    </div>
                    

                    <button onClick={() => this.showModal(id.item)}>
                        More details...
                    </button>

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
                    workDetail={this.props.workDetail}
                />
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    works: state.data.items.hits.hits,
    workDetail: state.detailData.isFetching || state.detailModal.modalID === 0 ? {} : state.detailData.item.hits.hits[0],
    doc_id: state.detailModal.modalID,
    showModal: state.detailModal.show
})

export default connect(mapStateToProps)(Archives)
