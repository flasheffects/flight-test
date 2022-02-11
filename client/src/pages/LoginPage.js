import React, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginPage() {
  const [userValue, setUserValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleUser = (e) => {
    const login = e.target.value;
    setUserValue(login);
  };
  const handlePassword = (e) => {
    const pass = e.target.value;
    setPasswordValue(pass);
  };

  const AuthCheck = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth", {
        method: "POST",
        body: JSON.stringify({
          user: userValue,
          password: passwordValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.data) {
            window.location.replace("/user-page");
          } else {
            alert("Wrong username or password");
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="log-back">
      <form className="log-form" onSubmit={AuthCheck}>
        <h2 className="first-title">FLIGHT APP</h2>
        <div>
          <label>
            <h5 className="log-sub-title">Username</h5>
            <input
              className="log-input"
              onChange={handleUser}
              type="text"
              required
            />
          </label>
        </div>
        <div>
          <label>
            <h5 className="log-sub-title">Password</h5>
            <input
              className="log-input"
              onChange={handlePassword}
              type="password"
              required
            />
          </label>
        </div>
        <div>
          <button className="btn-log" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
