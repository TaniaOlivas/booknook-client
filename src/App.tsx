import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Navigation from './components/Navigation/Navigation';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');

  const updateLocalStorage = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const userLocalStorage = (newUser: string) => {
    localStorage.setItem('UserType:', newUser);
    setUser(newUser);
  };

  const idLocalStorage = (newId: string) => {
    localStorage.setItem('Id:', newId);
    setUserId(newId);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token') || '{}');
    }
    if (localStorage.getItem('UserType:')) {
      setUser(localStorage.getItem('UserType:') || '{}');
    }
    if (localStorage.getItem('Id:')) {
      setUserId(localStorage.getItem('Id:') || '{}');
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
    setToken('');
    setUser('');
    setUserId('');
  };
  return (
    <>
      <div>
        <Router>
          {token ? (
            <Navigation
              token={token}
              clearLocalStorage={clearLocalStorage}
              user={user}
              userId={userId}
            />
          ) : (
            <Auth
              updateLocalStorage={updateLocalStorage}
              userLocalStorage={userLocalStorage}
              idLocalStorage={idLocalStorage}
            />
          )}
        </Router>
      </div>
    </>
  );
}

export default App;
