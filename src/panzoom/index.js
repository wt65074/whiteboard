import React from "react";
import usePanAndZoom from "./usePanAndZoom";

const { useState } = React;

function PanAndZoom(props) {
  const { containerStyle, onClick, disabled = false } = props;

  // Think about how a reducer can help this
  const [isPanning, setIsPanning] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  const {
    containerRef,
    onMouseDown,
    onWheel,
    translateX,
    translateY,
    scale,
    onMouseMove,
    floorOffsetX = 0,
    ceilOffsetX = 0,
    diffX = 0,
    diffY = 0,
    positionInScreen = { x: 0, y: 0 },
    positionInContainer = { x: 0, y: 0 },
    positionInContent = { x: 0, y: 0 }
  } = usePanAndZoom();

  return (
    <React.Fragment>
      <div style={{ position: "fixed", top: "5px", left: "5px" }}>
        <p>
          {translateX}, {translateY}, @ {scale}
        </p>
        <p>
          {diffX}, {floorOffsetX}, {ceilOffsetX}
        </p>
        <p>
          Position Scr: {positionInScreen.x}, {positionInScreen.y}, Position
          Cont: {positionInContainer.x}, {positionInContainer.y}, Pos In
          Content: {positionInContent.x}, {positionInContent.y}
        </p>
      </div>
      <div
        style={{
          overflow: "hidden",
          ...containerStyle
        }}
        ref={containerRef}
        onMouseDown={e => {
          disabled || onMouseDown(e);
          setMouseDown(true);
        }}
        onMouseMove={e => {
          onMouseMove(e);
          setIsPanning(mouseDown);
        }}
        onMouseUp={e => {
          if (!isPanning)
            onClick &&
              onClick({ event: e, positionInContent, positionInContainer });
          setMouseDown(false);
          setIsPanning(false);
        }}
        onWheel={disabled ? undefined : onWheel}
      >
        <div
          style={{
            transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
            transformOrigin: "top left",
            height: "100%",
            width: "100%"
          }}
        >
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
}

export default PanAndZoom;
