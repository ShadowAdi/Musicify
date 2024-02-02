import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/SongListSearch.css";
import { motion } from "framer-motion";
import { allContext } from "../context/userContext";

const SearchBar = () => {
  const { onMouseEnterInput,
    onMouseLeaveInput,}=useContext(allContext)
  const [selectedValue, setSelectedValue] = useState("track");
  const [query, setQueryValue] = useState("");
  const navigate = useNavigate();
  const handleSelectedType = (e) => {
    setSelectedValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/Search/${query}/type=${selectedValue}`);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  

  return (
    <>
      <div className="options">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            placeholder="Enter Songs,Albums,Artists..."
            onChange={(e) => {
              setQueryValue(e.target.value);
            }}
            onKeyPress={handleKeyDown}
            onMouseEnter={onMouseEnterInput}
            onMouseLeave={onMouseLeaveInput}
          />

          <div className="option">
            <motion.select
              transition={{ duration: 0.5, ease: "easeInOut" }}
              value={selectedValue}
              onChange={handleSelectedType}
            >
              <option value="track">Tracks</option>
              <option value="album">Albums</option>
              <option value="artist">Artists</option>
              <option value="playlist">Playlist</option>
            </motion.select>
          </div>
          <motion.button
            whileHover={{ scale: 1.09 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            type="submit"
          >
         
            <span>Search</span>
          </motion.button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
