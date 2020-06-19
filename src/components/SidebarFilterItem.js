import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleFilters } from '../store/actions'
class SidebarFilterItem extends Component {
    state = {
        active: false,
    }

    setStateAndFilter = filter => {
        let { filterArray } = this.props
        this.setState(
            { active: !filterArray.some(f => f.label === filter.label) },
            () => {
                this.props.dispatch(handleFilters(filter, this.state.active))
            }
        )
    }

    render() {
        let { listItem, type, filterArray } = this.props
        let activated = !!filterArray.some(f => f.label === listItem.key)
        return (
            <div
                className={`flex item-filter ${activated ? 'active' : ''}`}
                onClick={() => {
                    this.setStateAndFilter({
                        type: type,
                        label: listItem.key,
                    })
                }}
            >
                <div>
                    <span>{listItem.key}</span>
                    <span> ({listItem.doc_count})</span>
                </div>
                {activated ? (
                    <i className="fal fa-times-circle fade-up" />
                ) : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    filterArray: state.filterArray,
    currentSearchTerm: state.currentSearchTerm,
})

export default connect(mapStateToProps)(SidebarFilterItem)
