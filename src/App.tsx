import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <div>
      <Auth />
      <Navbar />
    </div>
  );
}

export default App;
