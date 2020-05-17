import React from "react";

function CreateComment(props) {
  const { text, position, onChangeText, onSave, onCancel } = props;
  return (
    <div
      style={{
        position: "relative",
        left: position.x - 100,
        top: position.y - 75,
        display: "inline-block",
        zIndex: 2
      }}
    >
      <textarea
        style={{
          height: 150,
          width: 200,
          borderRadius: 10,
          padding: 5,
          position: "relative",
          fontSize: "medium",
          resize: "none"
        }}
        onClick={e => {
          e.stopPropagation();
        }}
        value={text ?? ""}
        onChange={e => {
          onChangeText(e.target.value);
        }}
      />
      <div style={{ display: "flex" }}>
        <div
          onClick={onSave}
          style={{
            height: 30,
            width: 30,
            marginRight: "5px",
            borderRadius: "50%",
            backgroundColor: "green"
          }}
        />
        <div
          onClick={onCancel}
          style={{
            height: 30,
            width: 30,
            borderRadius: "50%",
            backgroundColor: "red"
          }}
        />
      </div>
    </div>
  );
}

export default CreateComment;
