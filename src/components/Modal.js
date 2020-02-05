import '../assets/sass/nlm/modal.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    buildWorkType,
    buildPersonType,
    buildSubjectType,
    buildPlaceType,
    buildMeta,
    buildNotes,
    parseSection,
} from '../tools/ui'
import { selectorDetailsItem } from '../store/selectors'
import { SectionLink } from './SectionLink'
import { withNamespaces } from 'react-i18next'

class Modal extends Component {
    state = {}

    handleBackButton = (initialRender, e) => {
        let lang = this.props.match.params.lng
        e.preventDefault()
        this.props.dispatch({ type: 'SET_MODAL', payload: false })
        if (initialRender) {
            this.props.history.push(`/${lang}/archives`)
        } else {
            this.props.history.goBack()
        }

        e.stopPropagation()
    }

    render() {
        let showHideClassName = this.props.show
            ? 'modal display-block'
            : 'modal display-none'

        const { itemDetail, t, match, label } = this.props
        if (!itemDetail) {
            return null
        }
        const { _notes, workCatalogInfo } = itemDetail
        const id = match.params.id
        let buildType
        let topSection, catalog

        if (id[4] === 'W') {
            buildType = buildWorkType
            catalog = workCatalogInfo ? (
                <div className="meta-catalog">
                    <div className="modal-text">
                        <span className="meta-title">
                            <SectionLink
                                label="catalog"
                                section={workCatalogInfo}
                            />
                        </span>
                    </div>
                </div>
            ) : null

            topSection = <React.Fragment>{catalog}</React.Fragment>
        } else if (id[4] === 'P') {
            buildType = buildPersonType
        } else if (id[4] === 'T') {
            buildType = buildSubjectType
        } else if (id[4] === 'G') {
            buildType = buildPlaceType
        }

        const { notes, nlmIDs } = buildNotes(_notes)

        // META DETAILS, like type and IDs
        const meta = buildMeta(t, id, nlmIDs)

        // CLOSE BUTTON
        const closeBtn = (
            <button
                className="modal-btn with-border"
                onClick={e =>
                    this.handleBackButton(this.props.initialRender, e)
                }
            >
                <i className="fa fa-2x fa-times"></i>
                <span>
                    {this.props.initialRender
                        ? t('technical.btn-view')
                        : t('technical.btn-close')}
                </span>
            </button>
        )
        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    <div className="details-container">
                        <div className="details-abs-container">
                            <div
                                className="back-btn"
                                onClick={e =>
                                    this.handleBackButton(
                                        this.props.initialRender,
                                        e
                                    )
                                }
                            >
                                <i className="icon fal fa-long-arrow-left fa-2x" />
                            </div>
                        </div>
                        <div className="detail-data">
                            <div className="detail-top-section with-border">
                                {topSection}
                                {meta}
                            </div>

                            <div className="modal-title">{label}</div>

                            {buildType(itemDetail, t, notes)}

                            {/* {notes} */}
                            {closeBtn}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    show: state.setModal,
    itemDetail:
        state.detailsItem.item.hits.hits.length === 0
            ? {}
            : selectorDetailsItem(state.detailsItem.item.hits.hits[0]),
})

const withN = withNamespaces()(Modal)
export default connect(mapStateToProps)(withN)
