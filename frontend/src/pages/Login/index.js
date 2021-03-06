import React, { useState, useEffect} from "react";

import ListPelada from "../../components/ListPelada";
import { useAuth } from "../../context/auth";

import styles from "./index.module.css";

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const { Login, loading, error } = useAuth();

  function handleLogin(e) {
    e.preventDefault();
    Login(loginData);
  }

  return (
    <div className={styles.containerLogin}>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <hr />
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          value={loginData.username}
          name='username'
          onChange={({ target }) =>
            setLoginData({ ...loginData, username: target.value })
          }
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          value={loginData.password}
          name='password'
          onChange={({ target }) =>
            setLoginData({ ...loginData, password: target.value })
          }
          required
        />
        <button>Log In</button>
        {loading && <p className={styles.notification}>Loading...</p>}
        {!loading && error && <p className={styles.error}>{ JSON.parse(error.request.response).detail }</p>}
        { <ListPelada /> }
      </form>
    </div>
  );
}

export default Login;
