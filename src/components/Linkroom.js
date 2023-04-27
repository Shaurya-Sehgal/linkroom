import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Linkroom() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rooms, setRooms] = useState([]);
  function logout() {
    localStorage.removeItem("username");
    navigate("/");
  }
  async function getRooms() {
    let userRooms = await fetch(
      `https://apex.oracle.com/pls/apex/shaurya_sehgal/links/roomid?user=${localStorage.getItem(
        "username"
      )}%`
    );
    let convertedUserRooms = await userRooms.json();
    setRooms(convertedUserRooms.items);
  }

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <Link to="/" className="text-decoration-none">
              <h1 className="m-3 display-1 text-center text-primary">
                LinkRoom
              </h1>
            </Link>
          </div>
          <div
            className={`col-4 d-flex align-items-center justify-content-end ${
              location.pathname === "/room" ? "d-none" : ""
            }`}
          >
            <img
              src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
              alt=""
              className={`rounded-circle me-2 ${
                localStorage.getItem("username") == null ? "d-none" : ""
              }`}
              width={70}
              onClick={() => {
                console.log("updated room");
                getRooms();
              }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
            />
          </div>
        </div>
      </div>

      <div
        className="modal fade modal-xl"
        id="exampleModal2"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {localStorage.getItem("username")} <br />
                Rooms: {rooms.length}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  {rooms.map((element, index) => {
                    return (
                      <div key={index} className="col-xl-4 col-lg-6">
                        <div
                          className="card text-bg-light mb-3 m-auto"
                          style={{ maxWidth: "18rem" }}
                        >
                          <div className="card-header">Room-{index + 1}</div>
                          <div className="card-body">
                            <h5 className="card-title">{element.code}</h5>
                            <p className="card-text d-flex justify-content-between">
                              <a
                                href="/room"
                                className="btn btn-primary"
                                aria-label="Close"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                  localStorage.setItem("room_id", element.code);
                                  navigate("/room");
                                }}
                              >
                                Open Room
                              </a>
                              <button
                                href="#"
                                className="btn btn-outline-primary"
                                onClick={() => {
                                  navigator.clipboard.writeText(element.code);
                                }}
                              >
                                <i className="bi bi-clipboard"></i>
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={logout}
              >
                Logout
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Linkroom;
