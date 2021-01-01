import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import decode from 'jwt-decode';
import { setToken } from '../../auth/ManageToken.js';
import { useAuth } from '../../auth/AuthContext';
import LoadingSpinner from '../../components/Common/LoadingSpinner/LoadingSpinner';
import Login from '../../components/Login/Login';

const LoginContainer = () => {
  const { setUser } = useAuth();
  const history = useHistory();

  const [auth, setAuth] = useState({
    loading: null,
    error: null,
  });

  const handleLogin = (loginData) => {
    setAuth({ ...auth, loading: true });

    fetch('http://localhost:5000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((result) => {
        setToken(result.token);
        const user = decode(result.token);

        setUser(user);
        history.push('/home');
      })
      .catch((err) => {
        setAuth({ loading: false, error: error });
      })
      .finally(() => setAuth({ ...auth, loading: false }));
  };

  return (
    <>
      {auth.error ? (
        <h4>{auth.error.message}</h4>
      ) : auth.loading ? (
        <LoadingSpinner />
      ) : (
        <Login login={handleLogin} />
      )}
    </>
  );
};

export default LoginContainer;
