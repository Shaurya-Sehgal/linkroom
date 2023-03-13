import React, { useRef, useState } from "react";
import { Await, useNavigate } from "react-router-dom";

function Login() {
  const username = useRef("");
  const code = useRef("");
  const navigate = useNavigate();
  const [passwordCorrection, setPasswordCorrection] = useState("");
  const [usernameCorrection, setUsernameCorrection] = useState("");

  async function handleSignup() {
    setPasswordCorrection("");
    document.getElementById("exampleInputPassword1").style.borderColor = "";
    if (code.current.value.length <= 3) {
      setPasswordCorrection("Password has to have 3 or more characters");
      document.getElementById("exampleInputPassword1").style.borderColor =
        "red";
      return;
    }
    let accounts = await fetch(
      "https://apex.oracle.com/pls/apex/shaurya_sehgal/linkroom/get"
    );
    let convertedData = await accounts.json();
    convertedData = convertedData.items;
    for (let i = 0; i < convertedData.length; i++) {
      if (username.current.value == convertedData[i].accname) {
        setUsernameCorrection("Already Taken");
        document.getElementById("exampleInputEmail1").style.borderColor = "red";
        return;
      }
    }
    let response = await fetch(
      `https://apex.oracle.com/pls/apex/shaurya_sehgal/linkroom/add?accname=${username.current.value}&code=${code.current.value}`,
      { method: "POST" }
    ).then(() => {
      setUsernameCorrection("Account Created Successfully");
      document.getElementById("exampleInputEmail1").style.borderColor = "green";
    });
  }

  async function handleLogin() {
    let accounts = await fetch(
      "https://apex.oracle.com/pls/apex/shaurya_sehgal/linkroom/get"
    );
    let convertedData = await accounts.json();
    let accountsArray = convertedData.items;
    let login = "unsuccessful";
    accountsArray.map((element) => {
      if (
        element.accname === username.current.value &&
        element.code === code.current.value
      ) {
        localStorage.setItem("username", username.current.value);
        login = "successful";
        navigate("/dashboard");
        return;
      }
    });
    if (login == "unsuccessful") {
      setPasswordCorrection("Incorrect Credentials");
    }
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
              <label htmlFor="exampleInputEmail1" className="form-label me-2">
                Username
              </label>
              <label
                htmlFor="exampleInputEmail1"
                className={`form-label ${
                  usernameCorrection == "Already Taken"
                    ? "text-danger"
                    : "text-success"
                }`}
                id="usernameCorrection"
              >
                {usernameCorrection}
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
              <label
                htmlFor="exampleInputPassword1"
                className="form-label me-2"
              >
                Password
              </label>
              <label
                htmlFor="exampleInputPassword1"
                className="form-label text-danger"
                id="passwordCorrection"
              >
                {passwordCorrection}
              </label>
              <input
                ref={code}
                type="password"
                className={`form-control ${
                  passwordCorrection.length === 0 ? "" : "border-danger"
                }`}
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
