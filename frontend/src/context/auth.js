import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const storageUser = localStorage.getItem('@App:user');
    const storageToken = localStorage.getItem('@App:token');

    if (storageUser && storageToken) {
      setUser(JSON.parse(storageUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
    }
  }, [])


  const Login = (loginData) => {

    setloading(true);
    api
      .post("/api/customtoken/", loginData)
      .then((response) => {
      
        setUser(JSON.parse(atob(response.data.access.split(".")[1])))
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        localStorage.setItem('@App:user', atob(response.data.access.split(".")[1]));
        localStorage.setItem('@App:token', response.data.access);

        console.log(response.data);
        setloading(false);
      })
      .catch((error) => {
        setError(error.response.data.detail);
        setloading(false);
      }).then(setloading(false));
  
  }

  const logout = () => {
    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:token');
    setUser(null);
    api.defaults.headers.common['Authorization'] = null;
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), Login, user, error, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
