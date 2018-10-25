import React from 'react'
import Language from '../containers/Language'
import { connect } from 'react-redux'

const Languages = (props) => {
    const list = props.languages.map(l => {
        return (
            <Language key={l} selectedLanguage={l}>{l}</Language>
        );
    });
    return (
        <ul className="language-list">{list}</ul>
    );
}

const mapStateToProps = (state) => ({
    languages: Object.keys(state.pages.items)
});

export default connect(mapStateToProps)(Languages)