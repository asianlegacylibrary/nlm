import React from 'react'
import { unpackNotes } from '../../ontology'
import { uniq } from '../../utilities'

export function buildNotes(notes) {
    let parsedNotes = null,
        nlmIDs = null
    if (notes) {
        ;({ parsedNotes, nlmIDs } = unpackNotes(notes))
    }

    parsedNotes = !parsedNotes || !parsedNotes.length ? null : uniq(parsedNotes)

    parsedNotes =
        !parsedNotes || !parsedNotes.length ? null : (
            <div className="meta-grouping">
                {parsedNotes.map((s, i) => (
                    <React.Fragment key={i}>
                        <p className="meta-item with-fa-note">{s}</p>
                    </React.Fragment>
                ))}
            </div>
        )

    return { notes: parsedNotes, nlmIDs: nlmIDs }
}
