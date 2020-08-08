export interface StateManager {
  startDragging: () => void;
  stopDragging: () => void;
  isDragging: () => boolean;
}

export const createStateManager = (): StateManager => {
  let isDrag = false;

  return {
    startDragging: () => {
      isDrag = true;
    },
    stopDragging: () => {
      isDrag = false;
    },
    isDragging: () => isDrag,
  };
};
