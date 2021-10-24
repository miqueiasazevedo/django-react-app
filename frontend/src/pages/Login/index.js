import React, { useState, useEffect} from "react";
import Input from "../../components/form/Input";

import ListPelada from "../../components/ListPelada";
import { useAuth } from "../../context/auth";
import useForm from "../../hooks/UseForm";

import styles from "./index.module.css";

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const { Login, loading, error } = useAuth();
  const username = useForm('username');
  const password = useForm('');

  function handleLogin(e) {
    e.preventDefault();
    Login(loginData);
    console.log(loginData);
  }

  useEffect(() => {
    setLoginData({
      ...loginData,
      username: username.value,
      password: password.value
    })
  }, [username.value, password.value])

  return (
    <div className={styles.containerLogin}>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <hr />
        <Input
          id='username'
          label='Username'
          type='username'
          required
          {...username}
        />
        <Input
          id='password'
          type='password'
          label='Password'
          required
          {...password}
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
