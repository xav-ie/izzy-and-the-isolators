import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import Sketchy from "./pages/Sketchy";
import Sockety from "./pages/Sockety";
import Canvas from "./pages/Whiteboard";

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/list' component={List} />
          <Route path='/canvas' component={Canvas} />
          <Route path='/sketchy' component={Sketchy} />
          <Route path='/sockety' component={Sockety} />

        </Switch>
      </div>
    )
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;