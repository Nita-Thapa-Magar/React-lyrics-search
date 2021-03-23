import React, { Component, useContext } from "react";
import { Context } from "../../context";
import Spinner from "../spinner/Spinner";
import Track from "./Track";

const Tracks = () => {
  const [state] = useContext(Context);
  const { track_list, heading } = state;

  if (track_list === undefined || track_list.length === 0) {
    return <Spinner />;
  } 
  else {
    return (
      <>
        <h3 className="text-center mb-5">{heading}</h3>
        <div className="row">
          {track_list.map(item => (
            <Track key={item.track.track_id} track={item.track} />
          ))}
        </div>
      </>
    );
  }
};

export default Tracks;