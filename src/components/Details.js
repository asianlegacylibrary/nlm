import '../assets/sass/nlm/details.scss'
import '../assets/sass/nlm/modal.scss'
import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import i18n from 'i18next'
import { fetchIDAction } from '../store/actions'
import { selectorDetailsItem } from '../store/selectors'
import {
    buildWorkType,
    buildPersonType,
    buildSubjectType,
    buildPlaceType,
    buildMeta,
    buildNotes,
    parseSection,
} from '../tools/ui'
import { SectionLink } from './SectionLink'

class Details extends React.Component {
    state = {}
    componentDidMount() {
        if (this.props.itemDetail.length === 0) {
            this.props.fetchIDAction(this.props.match.params.id)
        }
    }

    // handleHideModal = (initialRender, e) => {
    //     //this.props.dispatch({ type: 'SET_MODAL', show: false })

    //     if (initialRender) {
    //         this.props.history.push(`/${i18n.language}/archives`)
    //     } else {
    //         this.props.history.goBack()
    //     }

    //     e.stopPropagation()
    // }

    handleBackButton = (initialRender, e) => {
        e.preventDefault()
        if (initialRender) {
            this.props.history.push(`/${i18n.language}/archives`)
        } else {
            this.props.history.goBack()
        }

        e.stopPropagation()
    }

    render() {
        const { itemDetail, t, match, label } = this.props
        if (!itemDetail) {
            return null
        }
        const { _notes, _creator, workCatalogInfo } = itemDetail
        const id = match.params.id
        let buildType
        let topSection, catalog, author

        if (id[4] === 'W') {
            buildType = buildWorkType
            catalog = workCatalogInfo ? parseSection(workCatalogInfo) : null
            author = _creator ? (
                <SectionLink label="Author" section={_creator} />
            ) : null
            topSection = (
                <React.Fragment>
                    {author}
                    {catalog}
                </React.Fragment>
            )
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
                className="modal-btn"
                onClick={e =>
                    this.handleBackButton(this.props.initialRender, e)
                }
            >
                <i className="fa fa-2x fa-times"></i>
                {this.props.initialRender
                    ? t('technical.btn-view')
                    : t('technical.btn-close')}
            </button>
        )

        return (
            <div className="details-container">
                <div className="details-abs-container">
                    <div
                        className="back-btn"
                        onClick={e =>
                            this.handleBackButton(this.props.initialRender, e)
                        }
                    >
                        <i className="icon fal fa-long-arrow-left fa-2x" />
                    </div>
                </div>
                <div className="detail-data">
                    {meta}
                    <div className="detail-top-section">{topSection}</div>
                    <div className="detail-title">{label}</div>

                    {buildType(itemDetail, t)}

                    {notes}
                    {closeBtn}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    itemDetail:
        state.detailsItem.item.hits.hits.length === 0
            ? {}
            : selectorDetailsItem(state.detailsItem.item.hits.hits[0]),
})

const withN = withNamespaces()(Details)
export default connect(mapStateToProps, { fetchIDAction })(withN)
