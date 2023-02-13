import React, { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

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

  async function uploadLink(title, link) {
    await fetch(
      `https://apex.oracle.com/pls/apex/shaurya_sehgal/links/links?code=${localStorage.getItem(
        "username"
      )}/${codeRef.current.value}&given_link=${link}&link_name=${title}`,
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
      if (element.title !== "" && element.link !== "") {
        uploadLink(element.title, element.link);
      }
    });
    alert("Success!!");
  }

  function enterRoom() {
    localStorage.setItem("room_id", roomIdRef.current.value);
    console.log(roomIdRef);
    navigate("/room");
  }

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
            <h1 className="display-5">
              Hello {localStorage.getItem("username")}
            </h1>
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
            <div className="col text-center">
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
              >
                Create a room!
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
        <div className="col"></div>
      </div>
    </>
  );
}

export default Dashboard;
