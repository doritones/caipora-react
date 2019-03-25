import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './routers/Home/Home';
import Timeline from './routers/Timeline/Timeline';
import AboutUs from './routers/AboutUs/AboutUs'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path='/' exact component={Home} />
          <Route path='/timeline' exact component={Timeline} />
          <Route path='/about' exact component={AboutUs} />
        </Layout>
      </div>
    );
  }
}

export default App;