import '../assets/sass/nlm/search.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { setMenu } from '../store/actions'
import { getTotal } from '../store/selectors'
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
        this.props.setMenu(menuItem.key)
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
                            current={this.props.menu}
                        />
                    )
                })}
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    total: getTotal(state.selectedBrowse, state.selectedMenu, state),
    menu: state.selectedMenu,
    currentSearch: state.ES.search.currentSearch,
})

const withN = new withNamespaces()(SearchMenu)
export default connect(mapStateToProps, { setMenu })(withN)
