import React from 'react'
import { log } from '../index'

const namesOfInterest = ['primary', 'personal']

export const unpackPersonName = (arr) => {
    if(arr == null) {
        return null
    } else if(Array.isArray(arr)) {
        return arr.map((a, i) => {
            if(typeof a === 'object') {
                return unpackPersonName(a)
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
        // re-factor to allow for retreival of '@value' from any key
        if(arr.hasOwnProperty('type')) {
            if(namesOfInterest.some(s => arr.type.toLowerCase().includes(s))) {
                return unpackNames(arr, arr.type)
            }
        } else {
            return (
                <p key={arr['@value']} className="meta-item">
                    <span className="meta-title">{arr['@value']}</span>
                </p>
            )
        }
        
    } else if (typeof arr === 'string') {
        if(arr.substring(0,3) === 'bdr') {
            return ( <div onClick={() => this.showModal(arr.split(":")[1])}>{arr}</div> )
        } else {
            return arr
        }
        
    }
}

export const unpackNames = (arr, type) => {
    
    if(Array.isArray(arr['rdfs:label'])) {
        
        const a = arr['rdfs:label'].sort().map((l, i) => {
            return (
                <div>
                    <span className="meta-italics">({l['@language']}): </span>
                    <span className="meta-title">{l['@value']}</span>
                </div>
            )}
        )

        return (
            <div key={type} className="meta-item with-fa">
                <span className="meta-detail">{type.substring(6)}:</span>
                {a}
            </div>
        )

    } else {
        return (
            <p key={type} className="meta-item with-fa">
                <span className="meta-detail">{type.substring(6)}: </span>
                <span className="meta-italics">({arr['rdfs:label']['@language']}): </span>
                <span className="meta-title">{arr['rdfs:label']['@value']}</span>
            </p>
        )
    }
}