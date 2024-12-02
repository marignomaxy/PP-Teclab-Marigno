import React, { useState } from 'react';
import { set } from 'react-hook-form';
export const AuthContext = React.createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(localStorage.getItem('Login') || false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('User')));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('Token')));
  const [id, setId] = useState(JSON.parse(localStorage.getItem('id')));
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('role')));

  const handlerLogin = (userData, tokenEnviado, id_user, rol) => {
    setToken(tokenEnviado);
    localStorage.setItem('Token', JSON.stringify(tokenEnviado));
    setLogin(true);
    localStorage.setItem('Login', true);
    setUser(userData);
    localStorage.setItem('User', JSON.stringify(userData));
    localStorage.setItem('id', JSON.stringify(id_user));
    setId(id_user);
    localStorage.setItem('role', JSON.stringify(rol));
    setRole(rol);
  };

  const handlerLogout = () => {
    setLogin(false);
    localStorage.removeItem('Login');
    setUser();
    localStorage.removeItem('User');
    setToken();
    localStorage.removeItem('Token');
    setId();
    localStorage.removeItem('id');
    setRole();
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider
      value={{ login, handlerLogin, handlerLogout, user, token, role, id }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
