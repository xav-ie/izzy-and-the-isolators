import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import Home from './pages/Home';
import List from './pages/List';
import MyBoards from "./pages/MyBoards";
import Canvas from "./pages/SketchAndSocket";
import CreateBoard from "./pages/CreateBoard";
import JoinBoard from "./pages/JoinBoard";


class App extends Component {
  render() {
    const App = () => (
      <div>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/createBoard' component={CreateBoard} />
          <Route exact path='/joinBoard' component={JoinBoard} />
          <Route path='/list' component={List} />
          <Route path='/canvas' component={Canvas} />
          <Route path='/myBoards' component={MyBoards} />
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