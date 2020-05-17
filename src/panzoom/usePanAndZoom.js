import { useRef, useReducer } from "react";
import reducer, { initialState } from "./reducer";
import { pan, startPan, zoom, move, mouseUp } from "./actions";

const usePanAndZoom = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const containerRef = useRef(null);

  const onMouseMoveInWindow = event => {
    event.preventDefault();
    const containerRect = containerRef.current.getBoundingClientRect();
    dispatch(pan(event, containerRect));
  };

  const onMouseUpInWindow = event => {
    const containerRect = containerRef.current.getBoundingClientRect();
    dispatch(mouseUp(event, containerRect));
    window.removeEventListener("mouseup", onMouseUpInWindow);
    window.removeEventListener("mousemove", onMouseMoveInWindow);
  };

  const onMouseDown = event => {
    const containerRect = containerRef.current.getBoundingClientRect();
    dispatch(startPan(event, containerRect));
    window.addEventListener("mouseup", onMouseUpInWindow);
    window.addEventListener("mousemove", onMouseMoveInWindow);
  };

  const onWheel = event => {
    event.preventDefault();
    event.stopPropagation();
    if (event.deltaY !== 0 && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      dispatch(zoom(event, containerRect));
    }
  };

  const onMouseMove = event => {
    //dispatch(move(event, containerRef.current.getBoundingClientRect()));
  };

  return {
    ...state,
    containerRef,
    onMouseDown,
    onWheel,
    onMouseMove
  };
};

export default usePanAndZoom;
