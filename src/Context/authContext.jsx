import React, { useState } from 'react';
export const AuthContext = React.createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(localStorage.getItem('Login') || false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('User')));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('Token')));

  const handlerLogin = (userData, tokenEnviado) => {
    setToken(tokenEnviado);
    localStorage.setItem('Token', JSON.stringify(tokenEnviado));
    setLogin(true);
    localStorage.setItem('Login', true);
    setUser(userData);
    localStorage.setItem('User', JSON.stringify(userData));
  };

  const handlerLogout = () => {
    setLogin(false);
    localStorage.removeItem('Login');
    setUser();
    localStorage.removeItem('User');
    setToken();
    localStorage.removeItem('Token');
  };

  return (
    <AuthContext.Provider
      value={{ login, handlerLogin, handlerLogout, user, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
