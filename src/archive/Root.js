import React from 'react';

import { Header } from './Header';
import { Footer } from './Footer';
import Posts from './Posts'
import Page from './Page'

export const Root = () => {

    return (
      <div className="container">
        <Header />
        {/* <Page /> */}
        <Posts />
        <Footer />
      </div>
    );
}