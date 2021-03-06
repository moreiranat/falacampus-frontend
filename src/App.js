import React from 'react';
import 'bootswatch/dist/simplex/bootstrap.css';
import './App.css';
import 'primeicons/primeicons.css';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
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