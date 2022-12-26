import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    try {
      if (newAccount) {
        // create Account
        const data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        // login
        const data = await signInWithEmailAndPassword(
          authService,
          email,
          password
        );
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const toggleAccount = () => setNewAccount(!newAccount);

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="authInput"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="authInput"
          required
        />

        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log in"}
          className="authInput authSubmit"
        />
      </form>

      {/* output error msg */}
      {error && <span className="authError">{error}</span>}

      
      <div onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "CreateAccount"}
      </div>
    </>
  );
}
