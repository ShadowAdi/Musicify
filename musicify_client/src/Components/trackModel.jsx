import React, { useState } from "react";
import "./Styles/TrackModel.css";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
const TrackModal = ({ track }) => {
  const [artistModal, setArtistModal] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="trackModal">
        <div className="spanRow">
          <span>Artist Name </span>
          <IoIosArrowForward
            onClick={() => setArtistModal(!artistModal)}
            size={18}
            style={{ cursor: "pointer" }}
          />
             {artistModal && (
        <div className="hiddenArtist">
          {track?.artist?.length > 0 ? (
            track?.artists?.map((artist, index) => {
              return (
                <span
                  onClick={() =>
                    navigate(`/Artist/${track?.artists[index]?.id}`)
                  }
                  key={index}
                >
                  {artist?.name}
                </span>
              );
            })
          ) : (
            <>
              <span>No Artists</span>
            </>
          )}
        </div>
      )}
        </div>

        <div className="spanRow">
          <span onClick={() => navigate(`/Albums/${track?.album?.id}`)}>
            Album Info{" "}
          </span>
        </div>
        <div className="spanRow">
          <span onClick={() => {
            navigator.clipboard.write(track?.album?.external_urls?.spotify).then((res)=>{
            alert("URL Copied")
            }).catch((err)=>{
                console.log(err)
            })
          }}>
            Copy Link
          </span>
        </div>
      </div>
   
    </>
  );
};

export default TrackModal;
