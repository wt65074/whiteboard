const ZOOM_FACTOR = 0.005;

export const Types = Object.freeze({
  pan: "PAN",
  panStart: "PAN_START",
  zoom: "ZOOM",
  move: "MOVE",
  mouseUp: "MOUSE_UP"
});

export const startPan = (event, containerRect) => ({
  type: Types.panStart,
  clientX: event.clientX,
  clientY: event.clientY,
  containerRect: containerRect
});

export const pan = (event, containerRect) => ({
  type: Types.pan,
  clientX: event.clientX,
  clientY: event.clientY,
  containerRect: containerRect
});

export const zoom = (event, containerRect) => ({
  type: Types.zoom,
  zoomFactor: ZOOM_FACTOR * event.nativeEvent.deltaY,
  clientX: event.clientX,
  clientY: event.clientY,
  containerRect: containerRect
});

export const move = (event, containerRect) => ({
  type: Types.move,
  clientX: event.clientX,
  clientY: event.clientY,
  containerRect: containerRect
});

export const mouseUp = (event, containerRect) => {
  return {
    type: Types.mouseUp,
    clientX: event.clientX,
    clientY: event.clientY,
    containerRect: containerRect
  };
};
