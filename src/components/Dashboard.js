import React from "react";

function Dashboard() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col text-center py-5">
            <h1>Hello {localStorage.getItem("username")}</h1>
          </div>
        </div>
      </div>
      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping">
          @
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div className="row py-5">
        <div className="col py-5">
          <div className="row py-5">
            <div className="col text-center bg-warning">
              <button className="btn btn-primary">Create a room!</button>
            </div>
            <div className="col text-center bg-danger">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Room Id"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </>
  );
}

export default Dashboard;
