import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="container">
      <h1 className="text-center mt-5">User Authentication</h1>
      <div className="d-flex justify-content-center mt-4">
        {!token ? (
          <>
            <Login setToken={setToken} />
            <Register />
          </>
        ) : (
          <Profile token={token} />
        )}
      </div>
    </div>
  );
}

export default App;
