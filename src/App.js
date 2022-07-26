import React from 'react';
import 'bootswatch/dist/simplex/bootstrap.css';
import './App.css';
import 'primeicons/primeicons.css';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
import NavBar from './components/NavBar';
import AppRoutes from './main/AppRoutes';
import SessionProvider from './main/SessionProvider';
import FooterComponent from './components/FooterComponent';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <SessionProvider>
          <NavBar />
          <AppRoutes />
          <FooterComponent />
        </SessionProvider>
      </div>
    )
  
  }
} 