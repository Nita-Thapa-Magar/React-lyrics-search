import React, { useState, useEffect, Component } from "react";
import axios from "axios";

export const Context = React.createContext();

export function ContextController({ children }) {
  let intialState = {
    track_list: [],
    heading: ""
  };

  const [state, setState] = useState(intialState);

  useEffect(() => {
    axios
      .get(
        `http://api.musixmatch.com/ws/1.0/chart.tracks.get?chart_name=top&page=1&page_size=10&country=it&f_has_lyrics=1
        &apikey=${process.env.REACT_APP_KEY}`)
      .then(res => {
        // console.log(res.data);
        setState({
          track_list: res.data.message.body.track_list,
          heading: "Top 10 Tracks"
        });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Context.Provider value={[state, setState]}>
    {children}
    </Context.Provider>
  );
}