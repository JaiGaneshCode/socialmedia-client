import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import { AuthContextProvider } from './context/auth'
import AuthRoute from './utils/AuthRoute'

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Regitser';
import MenuBar from './components/MenuBar';
import SinglePost from './pages/SinglePost';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <AuthContextProvider>
    <Router>
      <Container>
        <MenuBar/>
        <Route exact path="/" component={Home}/>
        <AuthRoute exact path="/login" component={Login}/>
        <AuthRoute exact path="/register" component={Register}/>
        <Route exact path="/posts/:postId" component={SinglePost}/>
      </Container>
    </Router>
    </AuthContextProvider>
  );
}

export default App;
