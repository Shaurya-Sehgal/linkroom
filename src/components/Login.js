import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const username = useRef("");
  const code = useRef("");
  const navigate = useNavigate();

  function handleSignup() {
    fetch(
      `https://apex.oracle.com/pls/apex/shaurya_sehgal/linkroom/add?accname=${username.current.value}&code=${code.current.value}`,
      { method: "POST" }
    );
  }

  async function handleLogin() {
    let accounts = await fetch(
      "https://apex.oracle.com/pls/apex/shaurya_sehgal/linkroom/get"
    );
    let convertedData = await accounts.json();
    console.log(convertedData.items);
    let accountsArray = convertedData.items;
    accountsArray.map((element) => {
      console.log(element.accname);
      if (
        element.accname === username.current.value &&
        element.code === code.current.value
      ) {
        // alert("login successful");
        localStorage.setItem("username", username.current.value);
        navigate("/dashboard");
      }
    });
  }

  return (
    <>
      <div className="container">
        <div
          className=" d-flex align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="col">
            <h2 className="text-center">Login/Sign up</h2>
          </div>

          <div className="w-50 m-auto">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input
                ref={username}
                type="username"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="enter your username here"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                ref={code}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="enter a unique code here"
              />
            </div>
            <button
              type="submit m-3"
              className="btn btn-primary me-2"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
