import React from 'react'
export function buildMeta(t, id, nlmIDs) {
    return (
        <div className="meta-detail">
            <p className="meta-item">
                <span>
                    {t('modal.detail')} {id},{' '}
                </span>
                <span> {t(`bdrc-ontology2.${id[4]}`)}</span>
            </p>
            {nlmIDs == null ? null : (
                <p className="meta-item">
                    <span>NLM ID: {nlmIDs.substring(7).trim()}</span>
                </p>
            )}
        </div>
    )
}
