import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useAxios } from "../hooks/UseAxios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const {response, loading, error, fetchData} = useAxios();

  useEffect(() => {
    const storageUser = localStorage.getItem('@App:user');
    const storageToken = localStorage.getItem('@App:token');

    if (storageUser && storageToken) {
      setUser(JSON.parse(storageUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
    }
  }, [])

  useEffect(() => {
    if (response?.access) {
      setUser(JSON.parse(atob(response.access.split(".")[1])))
      api.defaults.headers.common['Authorization'] = `Bearer ${response.access}`;
      localStorage.setItem('@App:user', atob(response.access.split(".")[1]));
      localStorage.setItem('@App:token', response.access);
    }
  }, [response])


  const Login = (loginData) => {

    fetchData({
      url: '/api/customtoken/',
      method: 'POST',
      data: {
        username: loginData.username,
        password: loginData.password
      }
    })
  
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
