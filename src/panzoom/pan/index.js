export const Pan = (state, action) => {
  const deltaMouseX = action.clientX - state.prevMouseX;
  const deltaMouseY = action.clientY - state.prevMouseY;

  return {
    ...state,
    translateX: state.translateX + deltaMouseX,
    translateY: state.translateY + deltaMouseY,
    prevMouseX: action.clientX,
    prevMouseY: action.clientY,
    isPanning: true
  };
};

export const PanStart = (state, action) => {
  return {
    ...state,
    prevMouseX: action.clientX,
    prevMouseY: action.clientY
  };
};
