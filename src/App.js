import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
<<<<<<< HEAD
import Login from './pages/Login';
import Config from './pages/Config';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
=======
import Config from './pages/Config';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
<<<<<<< HEAD
      <Route exact path="/" component={ Login } />
      <Route path="/config" component={ Config } />
      <Route path="/game" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
=======
      <Route exact path="/configuracao" component={ Config } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
    </Switch>
  );
}
