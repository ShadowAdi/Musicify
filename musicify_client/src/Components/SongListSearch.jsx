import React, { useContext} from "react";
import "./Styles/SongListSearch.css";
import Loading from "react-loading-components";
import { allContext } from "../context/userContext.jsx";
import SearchBar from "./SearchBar.jsx";
import GenreListCard from "./GenreListCard.jsx";
const SongListSearch = () => {
  const { isLoading,token } = useContext(allContext);
  

  return (
    <>
      <div className="recentPlaylistSearch">
        <div className="searchInput">
          <h1>Search</h1>
          <SearchBar />
        </div>

        <div className="genres">
          <h1>Genres</h1>
          {!isLoading ? (
        <>
        <GenreListCard/>
        </>
          ) : (
            <aside className="loaderDiv">
              <Loading type="audio" width={100} height={100} fill="#f44242" />
            </aside>
          )}
        </div>
      </div>
    </>
  );
};

export default SongListSearch;
