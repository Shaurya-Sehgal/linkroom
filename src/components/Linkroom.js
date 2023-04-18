import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Linkroom() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  function logout() {
    localStorage.removeItem("username");
    navigate("/linkroom");
  }

  useEffect(() => {
    async function getRooms() {
      let userRooms = await fetch(
        `https://apex.oracle.com/pls/apex/shaurya_sehgal/links/roomid?user=${localStorage.getItem(
          "username"
        )}%`
      );
      let convertedUserRooms = await userRooms.json();
      setRooms(convertedUserRooms.items);
      console.log(convertedUserRooms.items);
    }
    getRooms();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <Link to="/linkroom" className="text-decoration-none">
              <h1 className="m-3 display-1 text-center text-primary">
                LinkRoom
              </h1>
            </Link>
          </div>
          <div className={`col d-flex align-items-center justify-content-end`}>
            <img
              src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
              alt=""
              className={`rounded-circle me-2 ${
                localStorage.getItem("username") == null ? "d-none" : ""
              }`}
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
            <h2 className="offcanvas-title" id="offcanvasRightLabel">
              Profile
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div>
            <h4 className="px-3 m-0 p">
              Name: {localStorage.getItem("username")}
            </h4>
            <h4 className="px-3 m-0">Rooms: {rooms.length}</h4>
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
            <h3>Rooms</h3>
            {rooms.map((element, index) => {
              return (
                <div key={index}>
                  <div
                    className="card text-bg-light mb-3 m-auto"
                    style={{ maxWidth: "18rem" }}
                  >
                    <div className="card-header">Room-{index + 1}</div>
                    <div className="card-body">
                      <h5 className="card-title">{element.code}</h5>
                      <p className="card-text">
                        <a
                          href="/room"
                          className="btn btn-primary"
                          aria-label="Close"
                          data-bs-dismiss="offcanvas"
                          // onClick={() => {
                          //   localStorage.setItem("room_id", element.code);
                          //   navigate("/room");
                          // }}
                        >
                          Open Room
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    </>
  );
}

export default Linkroom;
