import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth from './components/Auth/Auth';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  const updateLocalStorage = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const userLocalStorage = (newUser: string) => {
    localStorage.setItem('UserType:', newUser);
    setUser(newUser);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token') || '{}');
    }
    if (localStorage.getItem('UserType:')) {
      setUser(localStorage.getItem('UserType:') || '{}');
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
    setToken('');
  };
  return (
    <div>
      <div className="container">
        <Router>
          {token ? (
            <Sidebar
              token={token}
              clearLocalStorage={clearLocalStorage}
              user={user}
            />
          ) : (
            <Auth
              updateLocalStorage={updateLocalStorage}
              userLocalStorage={userLocalStorage}
            />
          )}
        </Router>
      </div>
    </div>
  );
}

export default App;
