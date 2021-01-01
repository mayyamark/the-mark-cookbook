import { createContext, useContext } from 'react';

const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

const useAuth = () => useContext(AuthContext);

export { AuthContext, useAuth };
