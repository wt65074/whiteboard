const clamp = (x, min, max) => Math.max(min, Math.min(x, max));

export const ConstrainOffset = (maxOffsetX, maxOffsetY) => (state, action) => {
  const containerRect = action.containerRect;
  const originalCenterX = containerRect.width / 2;
  const originalCenterY = containerRect.height / 2;
  const scaledCenterX = originalCenterX * state.scale;
  const scaledCenterY = originalCenterY * state.scale;

  // This translation is already baked in to center the view
  // Since it is being transformed from the left origin
  // We do this order to get the difference in terms of the necessary translation
  const diffX = originalCenterX - scaledCenterX;
  const diffY = originalCenterY - scaledCenterY;

  // Calculate what the max offset should be to maintain the same distance at scale
  // When you scale the content and not the view you have to recompute expected offset in terms of
  // units relative to the container view
  const adjustedMaxOffsetX =
    (state.scale * maxOffsetX * 2 + (state.scale - 1) * containerRect.width) /
    2;
  const adjustedMaxOffsetY =
    (state.scale * maxOffsetX * 2 + (state.scale - 1) * containerRect.height) /
    2;

  // Adjust target offset by scale, and remove baked in scale
  // Without considering baked in scale you can offset much further
  // positivly than negatively
  // Subtract the difference because if the needed translation is negative (ie origin moves left),
  // then the most negative translation should be increased
  const floorOffsetX = -adjustedMaxOffsetX + diffX;
  const ceilOffsetX = adjustedMaxOffsetX + diffX;
  const floorOffsetY = -adjustedMaxOffsetY + diffY;
  const ceilOffsetY = adjustedMaxOffsetY + diffY;

  return {
    ...state,
    floorOffsetX,
    ceilOffsetX,
    diffX,
    diffY,
    translateX: clamp(state.translateX, floorOffsetX, ceilOffsetX),
    translateY: clamp(state.translateY, floorOffsetY, ceilOffsetY)
  };
};

export default ConstrainOffset;
