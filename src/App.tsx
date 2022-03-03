import * as React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Auth from './components/Auth/Auth';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [token, setToken] = useState('');

  const updateLocalStorage = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token') || '{}');
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
    setToken('');
  };
  return (
    <div>
      <div className="container">
        <Sidebar clearLocalStorage={clearLocalStorage} />
        <Auth updateLocalStorage={updateLocalStorage} />
      </div>
    </div>
  );
}

export default App;
