import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { Login, Profile } from "./components";
import "./App.css";

const LS_KEY = "auth_token";

const App = () => {
  const [user, setUser] = useState({});
  const [auth_token, setAuthToken] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth_token = JSON.parse(localStorage.getItem(LS_KEY));
    setAuthToken(auth_token);

    if (auth_token) {
      const {
        payload: { id },
      } = jwtDecode(auth_token);

      fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
        .then((response) => response.json())
        .then(({ user }) => {
          setUser(user);
          setIsAuth(true);
        })
        .catch((err) => {
          setIsAuth(false);
          console.log(err, "err");
        });
    }
  }, [handleLoggedIn]);

  const handleLoggedIn = (auth) => {
    localStorage.setItem(LS_KEY, JSON.stringify(auth));
    setAuthToken(auth);
    setIsAuth(true);
  };

  const handleLoggedOut = () => {
    localStorage.removeItem(LS_KEY);
    setAuthToken(undefined);
    setIsAuth(false);
  };

  return (
    <div className="container-fluid">
      <div className="container">
        {isAuth ? (
          <Profile
            user={user}
            auth_token={auth_token}
            onLoggedOut={handleLoggedOut}
          />
        ) : (
          <Login onLoggedIn={handleLoggedIn} onLoggedOut={handleLoggedOut} />
        )}
      </div>
    </div>
  );
};

export default App;
