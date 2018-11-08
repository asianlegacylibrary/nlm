import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from './Header';

class Page extends Component {

  render() {
   
    if(this.props.isFetching) {
        return (
          <div>LOADING</div>
        );
    }
    if(!this.props.isFetching) {
      console.log(this.props.isFetching);
      console.log(this.props.language)
      console.log(typeof(this.props.pages), this.props.pages[this.props.language]);
    }
    
    
    return (
      
        
      <div className="container">
        {/* <Header /> */}
        <div>HI</div>
        {/* <div className="content">{posts}</div> */}
      </div>
    );
  }

}

const processPages = (pages, lang) => {
  pages.reduce(function (r, a) {
    r[a.acf.language] = r[a.acf.language] || [];
    r[a.acf.language].push(a);
    return r;
  }, Object.create(null));
}


const mapStateToProps = state => {
  console.log('STATE ', state);
    return {
      isFetching: state.pages.isFetching,
      language: state.selectedLanguage,
      //pages: processPages(state.pagesByLanguage[state.selectedLanguage], state.selectedPage),
      //pages: processPages(state.pagesAll.items[state.selectedLanguage], state.selectedPage),
      pages: state.pages.items
      //posts: processPosts(state.postsByLanguage[state.selectedLanguage])
  }
}

export default connect(mapStateToProps)(Page);

//export default Home;

