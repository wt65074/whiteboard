import { Types } from "./actions";
import Zoom from "./zoom";
import { Pan, PanStart } from "./pan";
import { TrackPosition, ConstrainOffset } from "./modifiers";

export const initialState = {
  translateX: 0,
  translateY: 0,
  prevMouseX: 0,
  prevMouseY: 0,
  scale: 1,
  isPanning: false
};

const modifiers = [TrackPosition, ConstrainOffset(200, 200)];

const makeAction = (state, action) => {
  switch (action.type) {
    case Types.panStart:
      return PanStart(state, action);
    case Types.pan:
      return Pan(state, action);
    case Types.zoom:
      return Zoom(0.8, 1.2)(state, action);
    case Types.mouseUp:
      return { ...state, isPanning: false };
    case Types.move:
    default:
      return state;
  }
};

const reducer = (state, action) => {
  const newState = makeAction(state, action);
  return modifiers.reduce(
    (cumState, modifier) => modifier(cumState, action),
    newState
  );
};

export default reducer;
