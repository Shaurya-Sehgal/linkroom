import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Room() {
  let recievedLinks = [];
  const [links, setLinks] = useState([
    {
      link_name: "loading title",
      given_link: "...",
    },
  ]);

  useEffect(() => {
    async function getLinks() {
      recievedLinks = await fetch(
        `https://apex.oracle.com/pls/apex/shaurya_sehgal/links/links?room_id=${localStorage.getItem(
          "room_id"
        )}`
      );
      let convertedLinks = await recievedLinks.json();
      setLinks(convertedLinks.items);
    }
    getLinks();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="text-center display-4 mb-3">Links</h1>
        <h1 className="text-center display-6 mb-3">
          {localStorage.getItem("room_id")}
          <Link className="btn btn-danger mx-3" to="/dashboard">
            Exit Room
            <span
              class="spinner-grow spinner-grow-sm ms-2"
              role="status"
              aria-hidden="true"
            ></span>
          </Link>
        </h1>
        {links.map((element, index) => {
          return (
            <div className="card my-2">
              <h5 className="card-header">
                Room {localStorage.getItem("room_id")}
              </h5>
              <div className="card-body">
                <h5 className="card-title">{element.link_name}</h5>
                <p className="card-text">{element.given_link}</p>
                <a
                  target="_blank"
                  href={element.given_link}
                  className="btn btn-primary"
                >
                  Visit Link
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Room;
