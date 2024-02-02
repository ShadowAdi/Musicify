import React, { useContext, useEffect, useState } from "react";
import "./Styles/InfoModel.css";
import axios from "axios";
import { allContext } from "../context/userContext";
import { IoIosMusicalNotes } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

const CreateModal = ({ id }) => {
  const { token, setIsModal,selectedItem,setSelectedItem } = useContext(allContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState({});
  const [mouseEnter, setMouseEnter] = useState(false);

 

  const editPlaylist = () => {
    axios
      .get(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setDetails(res?.data);
        console.log(res?.data);
      })
      .catch((err) => console.log(err));
  };
  const sendDetail = () => {
    axios
      .put(
        `https://api.spotify.com/v1/playlists/${id}`,
        {
          name: name,
          public: true,
          description: description,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

 
 
  useEffect(() => {
    editPlaylist();
  }, [id]);

  return (
    <div className="createModal">
      <div className="midSection">
        <div className="heading">
          <h1>Edit Details</h1>
        </div>
        <div className="change">
          {" "}
          <div
            onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}
            className="modalImgContainer"
          >
            {!mouseEnter ? (
              <img
                src={
                  details?.images?.length > 0
                    ? details?.images[0]?.url
                    : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                }
                alt=""
              />
            ) : (
              <>
                <div className="chaneImage">
              
               
                  <IoIosMusicalNotes size={60} />
                  <span>You Can Change Cover In Spotify app or website</span>
                </div>
              </>
            )}
          </div>
          <div className="modalDesc">
            <input
              type="text"
              placeholder={details?.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              cols="26"
              rows="5"
              placeholder={details?.description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="buttons">
          <button onClick={() => setIsModal(false)}>Cancel</button>
          <button onClick={() => sendDetail()}>Change</button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;

