import '../assets/sass/nlm/card.scss'
import React from 'react'
import SearchCard from './SearchCard'
import { useSelector, useDispatch } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { fetchIDAction } from '../store/actions'
import { constants } from '../store/_constants'

let { menuItems } = constants

function useData(type) {
    return useSelector(state => {
        return state.ES[type]
    })
}

const SearchResults = ({ match, t }) => {
    const dispatch = useDispatch()

    const handleShowDetails = doc_id => {
        dispatch(fetchIDAction(doc_id))
    }

    const browse = useSelector(state => state.selectedMenu)
    let currentESdata = menuItems.find(x => x.key === browse)

    let data = useData(currentESdata.key)
    let d = data.items.hits.hits

    if (d.length === 0) {
        if (data.isFetching) {
            return (
                <div key="fetching" className="card grey lighten-3 hoverable">
                    <div className="card-content blue-grey-text darken-4">
                        <div className="blinky">
                            {t('technical.loading-simple')}{' '}
                            {t(`browse.${currentESdata.key}-plural`)}
                        </div>
                    </div>
                </div>
            )
        } else if (!data.isFetching) {
            return (
                <div key="no-results" className="card grey lighten-3 hoverable">
                    <div className="card-content blue-grey-text darken-4">
                        NO RESULTS
                    </div>
                </div>
            )
        }
    }

    const items = d.map((d, i) => {
        return (
            <SearchCard
                key={i}
                data={d}
                idx={i}
                handleShowDetails={handleShowDetails}
                match={match}
            />
        )
    })

    return <React.Fragment>{items}</React.Fragment>
}

const withN = new withNamespaces()(SearchResults)
export default withN
