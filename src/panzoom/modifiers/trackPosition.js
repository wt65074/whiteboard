export const TrackPosition = (state, action) => {
  const containerRect = action.containerRect;
  const positionInScreen = { x: action.clientX, y: action.clientY };
  const positionInContainer = {
    x: positionInScreen.x - containerRect.left,
    y: positionInScreen.y - containerRect.top
  };
  const positionInContent = {
    x: (positionInContainer.x - state.translateX) / state.scale,
    y: (positionInContainer.y - state.translateY) / state.scale
  };

  return {
    ...state,
    positionInScreen,
    positionInContainer,
    positionInContent
  };
};

export default TrackPosition;
