import '../assets/sass/nlm/search.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { setBrowse } from '../store/actions'
import { constants } from '../store/_constants'
import M from 'materialize-css'
import MenuOption from './MenuOption'

let { menuItems } = constants

class SearchMenu extends Component {
    componentDidMount() {
        //let tabs = document.querySelectorAll('.tabs')
        M.Tabs.init(this.Tabs, { duration: 400 }) //this.Tabs
    }

    handleClick = menuItem => {
        this.props.setBrowse(menuItem.key)
    }

    render() {
        return (
            <ul
                ref={Tabs => {
                    this.Tabs = Tabs
                }}
                className="tabs"
            >
                {menuItems.map(m => {
                    return (
                        <MenuOption
                            key={m.key}
                            option={m}
                            handleClick={this.handleClick}
                            current={this.props.browse}
                        />
                    )
                })}
            </ul>
        )
    }
}

function getTotal(type, state) {
    return state.ES[type].items.hits.total
}

const mapStateToProps = state => ({
    total: getTotal(state.selectedMenu, state),
    browse: state.selectedMenu,
    currentSearch: state.ES.results.currentSearch,
})

const withN = new withNamespaces()(SearchMenu)
export default connect(mapStateToProps, { setBrowse })(withN)
