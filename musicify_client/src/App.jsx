import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Playlist from "./Pages/Playlist";
import Login from "./Pages/Login";
import AlbumList from "./Pages/AlbumList";
import GenrePage from "./Pages/GenrePage";
import UserProfile from "./Pages/UserProfile";
import ArtistProfile from "./Pages/ArtistProfile";
import SearchPage from "./Pages/SearchPage";
import { useContext, useEffect, useState } from "react";
import BrowserSection from "./Components/BrowserSection";
import { allContext } from "./context/userContext";
import Footer from "./Components/Footer";
import { AnimatePresence ,motion} from "framer-motion";
import CustomCursor from "./Components/customCursor";


function App() {
 
  const {
    token,
    GlobalTrackId,
     FooterDetails,
  } = useContext(allContext);
  const location = useLocation();

 
  if (!token) {
    return (
      <>
        <main>
          <Login />
        </main>
      </>
    );
  }

  return (
    <>
    <CustomCursor/>
      <main>
        {token && <BrowserSection />}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* {error && redirect("/error")} */}
             <Route exact path="/Home" element={<Home />} />
            {token && <Route exact path="/Search" element={<Search />} />}
            {token && <Route path="/Albums/:id" element={<AlbumList />} />}
            {token && <Route path="/Playlist/:id" element={<Playlist />} />}
            {token && <Route path="/Genre/:name" element={<GenrePage />} />}
            {token && (
              <Route path="/UserProfile/:UserId" element={<UserProfile />} />
            )}
            {token && (
              <Route path="/Artist/:ArtistId" element={<ArtistProfile />} />
            )}
            {token && (
              <Route
                exact
                path="/Search/:query/:type"
                element={<SearchPage />}
              />
            )}
          </Routes>
        </AnimatePresence>
        
        {token && GlobalTrackId && FooterDetails && <Footer />}
      </main>
    </>
  );
}

export default App;
