import React, { useState, useEffect, useContext, Component } from "react";
import axios from "axios";
import {Context} from "../../context";


const Search = () => {
  const [state, setState] = useContext(Context);
  const [userInput, setUserInput] = useState("");
  const [trackTitle, setTrackTitle] = useState("");


  useEffect(() => {
    axios
      .get(
        `http://api.musixmatch.com/ws/1.0/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_KEY}`
      )
      .then(res => {
        let track_list = res.data.message.body.track_list;
        setState({ track_list: track_list, heading: "Search Results" });
      })
      .catch(err => console.log(err));
  }, [trackTitle]);

  const findTrack = e => {e.preventDefault();setTrackTitle(userInput);};

  const onChange = e => {setUserInput(e.target.value);};

  return (
    <div className="card card-body">
      <h1 className="title">Search The Song</h1>
      <form onSubmit={findTrack}>
        <div className="form-group">
          <input type="text" className="form-control form-control-lg" placeholder="Song Title..."
            name="userInput" value={userInput} onChange={onChange}/> 
        </div>
        <button className="btn-search btn-primary btn-lg btn-block mb-4 mt-4" type="submit"> <i className="fas fa-music" /> Get The Lyrics</button>
      </form>
    </div>
  );
};

export default Search;