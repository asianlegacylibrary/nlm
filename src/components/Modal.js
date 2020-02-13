import '../assets/sass/nlm/modal.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchIDAction } from '../store/actions'
import {
    buildWorkType,
    buildPersonType,
    buildSubjectType,
    buildPlaceType,
    buildMeta,
    buildNotes,
    buildPersonalDetails,
} from '../tools/ui'
import { selectorDetailsItem } from '../store/selectors'
import { SectionLink } from './SectionLink'
import { withNamespaces } from 'react-i18next'

class Modal extends Component {
    state = {}

    handleBackButton = (initialRender, e) => {
        e.preventDefault()
        console.log(this.props)
        let { lang, id } = this.props.match.params
        // let previousModalID = null

        // if (this.props.previousLocation.state) {
        //     previousModalID = this.props.previousLocation.state.modalID
        // }

        if (!this.props.previousLocation.state) {
            this.props.dispatch({ type: 'SET_MODAL', payload: false })
        }

        if (initialRender) {
            this.props.history.push(`/${lang}/archives`)
        } else {
            //console.log(previousModalID)
            // if (previousModalID) {
            //     if (previousModalID !== id) {
            //         previousModalID =
            //             previousModalID.substring(0, 3) === 'bdr'
            //                 ? previousModalID
            //                 : `bdr:${previousModalID}`
            //         this.props.dispatch(fetchIDAction(previousModalID))
            //     }
            // }

            this.props.history.goBack()
        }

        e.stopPropagation()
    }

    render() {
        let showHideClassName = this.props.show
            ? 'modal display-block'
            : 'modal display-none'

        const { itemDetail, itemRelated, t, match } = this.props
        if (!itemDetail) {
            return null
        }
        const { _notes, workCatalogInfo, _label } = itemDetail
        const id = match.params.id
        let buildType
        let topSection, catalog
        let personal = null

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
            personal = buildPersonalDetails(itemDetail, t)
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
                                {personal}
                            </div>

                            <div className="modal-title">{_label}</div>

                            {buildType(itemDetail, itemRelated, t, notes)}

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
        state.ES.id.items.hits.hits.length === 0
            ? []
            : selectorDetailsItem(state.ES.id.items.hits.hits[0]),
    itemRelated: state.ES.id.related,
})

const withN = withNamespaces()(Modal)
export default connect(mapStateToProps)(withN)
