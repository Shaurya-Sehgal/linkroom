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
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt=""
              className="rounded-circle me-2"
              width={50}
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
