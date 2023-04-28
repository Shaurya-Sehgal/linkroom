import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "bootstrap";

function Dashboard() {
  const title1Ref = useRef();
  const title2Ref = useRef();
  const title3Ref = useRef();

  const codeRef = useRef();

  const link1Ref = useRef();
  const link2Ref = useRef();
  const link3Ref = useRef();

  const roomIdRef = useRef();

  const navigate = useNavigate();

  const [rooms, setRooms] = useState([
    {
      code: "Shaurya/social-media",
      given_link: "discord.com",
      link_name: "discord",
      username: "Shaurya",
    },
    {
      code: "Shaurya/social-media",
      given_link: "youtube.com",
      link_name: "youtube",
      username: "Shaurya",
    },
    {
      code: "Shaurya/social-media",
      given_link: "google.com",
      link_name: "google",
      username: "Shaurya",
    },
  ]);

  useEffect(() => {
    async function fetchRooms() {
      let userRooms = await fetch(
        `https://apex.oracle.com/pls/apex/shaurya_sehgal/links/rooms?username=${localStorage.getItem(
          "username"
        )}`
      );
      let convertedUserRooms = await userRooms.json();
      setRooms(convertedUserRooms.items);
    }
    fetchRooms();
  }, []);

  async function uploadLink(title, link) {
    await fetch(
      `https://apex.oracle.com/pls/apex/shaurya_sehgal/links/links?code=${localStorage.getItem(
        "username"
      )}/${
        codeRef.current.value
      }&given_link=${link}&link_name=${title}&username=${localStorage.getItem(
        "username"
      )}`,
      { method: "POST" }
    );
  }

  function createRoom() {
    let links = [
      {
        title: title1Ref.current.value,
        link: link1Ref.current.value,
      },
      {
        title: title2Ref.current.value,
        link: link2Ref.current.value,
      },
      {
        title: title3Ref.current.value,
        link: link3Ref.current.value,
      },
    ];
    links.map((element, index) => {
      if (validateLink(element.title, element.link)) {
        uploadLink(element.title, element.link);
        return index;
      }
    });
    if (roomIdRef.current.value === "" || link1Ref.current.value === "") {
      alert("Must have at least have room code and 1 link");
      return;
    }
    alert("Success!");
  }

  function validateLink(title, link) {
    if (title !== "" && link !== "") {
      if (title.length >= 3) {
        if (link.substring(0, 8) === "https://") {
          return true;
        }
      }
    }
    return false;
  }

  function enterRoom() {
    localStorage.setItem("room_id", roomIdRef.current.value);
    navigate("/room");
  }

  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
  );
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create a Room
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Enter Code
                  </label>
                  <input
                    ref={codeRef}
                    placeholder="Enter Code"
                    type="text"
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
                <div className="mb-3">
                  <>
                    <label htmlFor="recipient-name" className="col-form-label">
                      Enter Links
                    </label>
                    <div className="input-group mb-3">
                      <input
                        ref={title1Ref}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        aria-label="Username"
                      />
                      <span className="input-group-text">@</span>
                      <input
                        ref={link1Ref}
                        type="text"
                        className="form-control w-25"
                        placeholder="Link"
                        aria-label="Server"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        ref={title2Ref}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        aria-label="Username"
                      />
                      <span className="input-group-text">@</span>
                      <input
                        ref={link2Ref}
                        type="text"
                        className="form-control w-25"
                        placeholder="Link"
                        aria-label="Server"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        ref={title3Ref}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        aria-label="Username"
                      />
                      <span className="input-group-text">@</span>
                      <input
                        ref={link3Ref}
                        type="text"
                        className="form-control w-25"
                        placeholder="Link"
                        aria-label="Server"
                      />
                    </div>
                  </>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={createRoom}
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col text-center py-5">
            <h1 className="display-4">
              Hello {localStorage.getItem("username")}
            </h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row py-5">
          <div className="col-lg-6 py-5">
            <div className="row py-5">
              <div className="col text-center">
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Create a room!{" "}
                  <i className="bi bi-arrow-right-circle-fill"></i>
                </button>
              </div>
              <div className="col text-center">
                <div className="input-group mb-3">
                  <input
                    ref={roomIdRef}
                    type="text"
                    className="form-control"
                    placeholder="Enter Room Id"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    onClick={enterRoom}
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
          <div className="col-lg-6">
            <h1 className="display-6 text-center">Your Links</h1>
            {rooms.map((element, index) => {
              return (
                <>
                  <div className="input-group mb-3 w-75 m-auto">
                    <span className="input-group-text w-25 d-flex justify-content-between">
                      {element.link_name}
                      <i
                        style={{ cursor: "pointer" }}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-custom-class="custom-tooltip"
                        data-bs-title="copy link"
                        class="bi bi-clipboard float-end"
                        onClick={() => {
                          navigator.clipboard.writeText(element.given_link);
                        }}
                      ></i>
                    </span>
                    <span
                      type="text"
                      className="form-control"
                      id="basic-url"
                      aria-describedby="basic-addon3"
                    >
                      {element.given_link}
                    </span>
                    <a
                      target="_blank"
                      href={element.given_link}
                      className="input-group-text"
                      id="basic-addon3"
                    >
                      Visit
                    </a>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
