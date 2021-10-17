import React, { useState } from "react";
import { useAuth } from "../../context/auth";

import ListPelada from "../../components/ListPelada";

import styles from "../Login/index.module.css";

function Home() {
  const { user, error, logout } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      {user && <p className={styles.notification}>Olá, {user.name[0]}</p>}
      <button onClick={logout}>Logout</button>
      <ListPelada />
    </div>
  );
}

export default Home;
