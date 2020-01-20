import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import HomeView from './views/HomeView'
import './App.css';

function App() {
  return(
    <Router>
      <div id="app">

        <div id="app-header">

        </div>

        <div id="app-views">
          <Switch>
            <Route exact path="/">
              <HomeView></HomeView>
            </Route>
          </Switch>
        </div>

        <div id="app-footer">

        </div>
      </div>      
    </Router>
  )
}

export default App;
