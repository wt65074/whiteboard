import { getZoomOffset, constrainZoom } from "./utils.js";

const reduce = (minZoom, maxZoom) => (state, action) => {
  const newScale = constrainZoom(
    state.scale + action.zoomFactor,
    minZoom,
    maxZoom
  );

  const mousePositionOnScreen = { x: action.clientX, y: action.clientY };

  const zoomOffset = getZoomOffset(
    state,
    action.containerRect,
    mousePositionOnScreen,
    state.scale,
    newScale
  );

  return {
    ...state,
    scale: newScale,
    translateX: state.translateX - zoomOffset.x,
    translateY: state.translateY - zoomOffset.y
  };
};

export default (min, max) => {
  return reduce(min, max);
};
