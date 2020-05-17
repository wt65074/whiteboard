import React from "react";

import PanZoom from "../panzoom";
import CreateComment from "./createComment.js";

const { useState } = React;

function Whiteboard(props) {
  // Consider turning this into a reducer
  const [click, setClick] = useState(null);
  const [editedText, setEditedText] = useState(null);
  const [comments, setComments] = useState([{ text: "winston", x: 0, y: 0 }]);

  const onSave = e => {
    setComments([...comments, { text: editedText, ...click }]);
    setEditedText(null);
    setClick(null);
    e.stopPropagation();
  };

  const onCancel = e => {
    setEditedText(null);
    setClick(null);
    e.stopPropagation();
  };

  const onChangeText = text => {
    setEditedText(text);
  };

  const onClick = e => {
    if (click) return;
    setClick(e.positionInContent);
  };

  return (
    <PanZoom
      containerStyle={{
        height: "80%",
        width: "80%",
        backgroundColor: "white"
      }}
      disabled={click != null}
      onClick={onClick}
    >
      {click && (
        <CreateComment
          text={editedText}
          position={click}
          onChangeText={onChangeText}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
      {comments.map(({ text, x, y }) => (
        <p
          style={{
            position: "absolute",
            left: x - 100,
            top: y - 75,
            width: 200,
            height: 150,
            fontSize: "medium",
            zIndex: 1,
            margin: 0,
            padding: "5px",
            WebkitUserSelect: "none"
          }}
        >
          {text}
        </p>
      ))}
      <div
        style={{
          width: "calc(100% + 380px)",
          height: "calc(100% + 380px)",
          position: "absolute",
          border: "dashed red 4px",
          left: -194,
          top: -194
        }}
      />
      <div
        style={{
          width: "5px",
          height: "5px",
          backgroundColor: "blue",
          position: "absolute",
          left: "calc(50% - 2.5px)",
          top: "calc(50% - 2.5px)"
        }}
      />
    </PanZoom>
  );
}

export default Whiteboard;
