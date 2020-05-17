export const getZoomOffset = (
  state,
  containerRect,
  mousePositionOnScreen,
  oScale,
  nScale
) => {
  const positionOnScreen = {
    x: mousePositionOnScreen.x,
    y: mousePositionOnScreen.y
  };

  const positionInContainer = {
    x: positionOnScreen.x - containerRect.left,
    y: positionOnScreen.y - containerRect.top
  };
  const currentPositionInContent = {
    x: (positionInContainer.x - state.translateX) / oScale,
    y: (positionInContainer.y - state.translateY) / oScale
  };

  const futurePositionInContent = {
    x: (positionInContainer.x - state.translateX) / nScale,
    y: (positionInContainer.y - state.translateY) / nScale
  };

  const neededTranslation = {
    x: (currentPositionInContent.x - futurePositionInContent.x) * nScale,
    y: (currentPositionInContent.y - futurePositionInContent.y) * nScale
  };

  return neededTranslation;
};

export const constrainZoom = (scale, min, max) =>
  Math.min(Math.max(min, scale), max);
