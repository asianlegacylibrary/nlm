import React, { Component } from 'react'
import { connect } from 'react-redux'
class SidebarFilterItem extends Component {
    state = {
        active: false,
        activeTerm: null,
    }

    setStateAndFilter = filter => {
        let { handleFilters, filterArray } = this.props

        this.setState(
            {
                active: !(
                    filterArray.some(f => f.label === filter.label) ||
                    this.state.active
                ),
                activeTerm: filter.label,
            },
            () => {
                handleFilters(filter, this.state.active, this.state.activeTerm)
            }
        )
    }

    render() {
        let { listItem, type, filterArray } = this.props
        let activated = !!(
            filterArray.some(f => f.label === listItem.key) || this.state.active
        )
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
                {this.state.active ? (
                    <i className="fal fa-times-circle fade-up" />
                ) : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({ filterArray: state.filterArray })

export default connect(mapStateToProps)(SidebarFilterItem)
