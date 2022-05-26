import React from 'react';
import 'bootswatch/dist/litera/bootstrap.css';
import './App.css';

import NavBar from './components/NavBar';
import AppRoutes from './main/AppRoutes';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <NavBar />
        <AppRoutes />
      </div>
    )
  
  }
} 