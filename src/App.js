import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PanZoom from "./panzoom";
import Whiteboard from "./whiteboard";

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "whiteSmoke",
        height: "100vh",
        width: "100%"
      }}
    >
      <Whiteboard />
    </div>
  );
}

export default App;
