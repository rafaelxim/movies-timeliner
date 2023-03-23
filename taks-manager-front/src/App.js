import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import CreateTask from './pages/CreateTask'

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact path='/login' component={ Login } />
          <Route exact path='/' component={ Home } />
          <Route exact path='/atividades/novo' component={ CreateTask } />
        </div>
      </BrowserRouter>     
    </div> 
  );
}

export default App;
 