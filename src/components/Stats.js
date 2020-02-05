import '../assets/sass/nlm/stats.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'
import img from '../assets/images/UB-woodblock-closeup.jpg'

class Stats extends Component {
    handleClick = () => {
        this.props.dispatch({ type: 'SET_PAGE', page: 'archives' })
    }
    render() {
        let statList
        const { stats, t, match, selectedPage } = this.props
        let lang = match.params.lng
        if (selectedPage !== 'home') {
            return null
        }
        if (
            Object.entries(stats).length === 0 &&
            stats.constructor === Object
        ) {
            statList = <div className="blinky">{t('technical.loading')}</div>
        } else {
            statList = (
                <ul className="list-stats">
                    <li className="stat-item">
                        <p>
                            {t('stats.LastUpdate')}: <em>{stats.LastUpdate}</em>
                        </p>
                    </li>
                    <li className="stat-item">
                        <p>
                            {t('stats.PagesDigitized')}:{' '}
                            <em>{stats.PagesDigitized}</em>
                        </p>
                    </li>
                    <li className="stat-item">
                        <p>
                            {t('stats.VolumesDigitized')}:{' '}
                            <em>{stats.VolumesDigitized}</em>
                        </p>
                    </li>
                    <li className="stat-item">
                        <p>
                            {t('stats.VolumesCataloged')}:{' '}
                            <em>{stats['VolumesCataloged(normalized)']}</em>
                        </p>
                    </li>
                    <li className="stat-item">
                        <p>
                            {t('stats.TitlesCataloged')}:{' '}
                            <em>{stats['TitlesCataloged(ACIP)']}</em>
                        </p>
                    </li>
                </ul>
            )
        }

        return (
            <div className="row flex no-margin stats-row">
                <div className="col s12 m6">
                    <h2>{t('stats.Title')}</h2>
                    {statList}
                </div>
                <div className="col s12 m6 valign-wrapper">
                    <span className="image down-push-s">
                        <Link
                            to={{ pathname: `/${lang}/archives` }}
                            className="item-link"
                            onClick={this.handleClick}
                        >
                            <img className="img-link" src={img} alt="" />
                            <div className="content">
                                Search the archives
                                {/* <div className="img-text">HI</div> */}
                            </div>
                        </Link>
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    stats: state.GS.isFetching ? {} : state.GS.items,
    selectedPage: state.selectedPage,
})

const withN = new withNamespaces()(Stats)
export default connect(mapStateToProps)(withN)
