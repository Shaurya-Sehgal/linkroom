import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Linkroom() {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("username");
    navigate("/");
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <h1 className="m-3 display-1 text-center text-primary">LinkRoom</h1>
          </div>
          <div className="col d-flex align-items-center justify-content-end">
            <img
              src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
              alt=""
              className="rounded-circle me-2"
              width={70}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            />
          </div>
        </div>
      </div>
      <>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">
              Profile
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <button
              className="btn btn-outline-danger w-100"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </>
    </>
  );
}

export default Linkroom;
