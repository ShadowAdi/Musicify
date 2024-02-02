import React, { useState } from "react";
import "./Styles/Albums.css";

const Albums = () => {
  const [isArtists, setIsArtists] = useState(false);

  return (
    <div className="library">
      <div className="header">
        <h1>Your Library</h1>
        <span onClick={() => setIsArtists(!isArtists)}>&#10148;</span>
      </div>
      {isArtists ? (
        <div className={"Artists"}>
          <div className="row">
            <div className="single">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/dc/Kabir_Singh.jpg"
                alt=""
              />
              <span>Artist Name</span>
            </div>
            <div className="single">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/dc/Kabir_Singh.jpg"
                alt=""
              />
              <span>Artist Name</span>
            </div>
          </div>
          <div className="row">
            <div className="single">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/dc/Kabir_Singh.jpg"
                alt=""
              />
              <span>Artist Name</span>
            </div>
            <div className="single">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/dc/Kabir_Singh.jpg"
                alt=""
              />
              <span>Artist Name</span>
            </div>
          </div>

          <div className="row">
            <div className="single">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/dc/Kabir_Singh.jpg"
                alt=""
              />
              <span>Artist Name</span>
            </div>
            <div className="single">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/dc/Kabir_Singh.jpg"
                alt=""
              />
              <span>Artist Name</span>
            </div>
          </div>

          <div className="row">
            <div className="single">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/dc/Kabir_Singh.jpg"
                alt=""
              />
              <span>Aditya</span>
            </div>
            <div className="single">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/dc/Kabir_Singh.jpg"
                alt=""
              />
              <span>Aditya</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="Albums">
          <div className="counts">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/d/dc/Kabir_Singh.jpg"
              alt=""
            />
            <div className="det">
              <h4>Bekhyali</h4>
              <span>Arijit Singh</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Albums;
