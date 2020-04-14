import React from 'react';
import { Switch, Route } from "react-router-dom";

import HomeView from 'views/HomeView'
import PostsByCommunity from 'views/PostsByCommunity'
import PageNotFound from 'views/PageNotFound'

import './App.css';

function App() {
  return(
      <div id="app">

        <div id="app-header">
        </div>

        <div id="app-views">
          <Switch>
            <Route  exact path="/" render={(props) => <HomeView {...props}/>}/>
            <Route  path="/posts/:community"
                    render={(props) => <PostsByCommunity {...props }/>} 
            />
            <Route render={() => <PageNotFound/>} />
          </Switch>
        </div>

        <div id="app-footer">

        </div>
      </div>
  )
}

export default App;
