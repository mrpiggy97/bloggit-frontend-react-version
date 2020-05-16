import React from 'react';
import { Switch, Route } from "react-router-dom";

import PageNotFound from 'views/PageNotFound'
import MainMenu from 'components/MainMenu'
import RenderPosts from 'views/RenderPosts'

import './App.css';

function App() {
  return(
      <div id="app">

        <div id="app-header">
          <MainMenu/>
        </div>

        <div id="app-views">
          <Switch>
            <Route exact path="/" render={(props) => <RenderPosts {...props}/>}/>
            <Route exact path="/posts/:query"
                    render={(props) => <RenderPosts {...props }/>} 
            />
            <Route exact path="/posts/search/:query" render={(props) => <RenderPosts {...props} /> }/>
            <Route render={() => <PageNotFound/>} />
          </Switch>
        </div>

        <div id="app-footer">

        </div>
      </div>
  )
}

export default App;
