import React from 'react';
import {
  Switch,
  Route,
  Router
} from "react-router-dom";

import { createBrowserHistory } from 'history'

import HomeView from 'views/HomeView'
import postsByCommunity from 'views/PostsByCommunity'

import './App.css';

export const customHistory = createBrowserHistory()

function App() {
  return(
    <Router history={customHistory}>
      <div id="app">

        <div id="app-header">

        </div>

        <div id="app-views">
          <Switch>
            <Route  exact path="/:id" render={(props) => <HomeView {...props} hello={"hola"}/>}/>
            <Route  path="/posts/:community"
                    render={(props) => <PostsByCommunity {...props }/>} 
            />
          </Switch>
        </div>

        <div id="app-footer">

        </div>
      </div>      
    </Router>
  )
}

export default App;
