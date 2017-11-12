import { OPEN, CLOSE } from '../constants/ws';

export const open = (endpoint, onMessage, onOpen) => ({
  type: OPEN,
  endpoint,
  onMessage,
  onOpen
});

export const send = (msg) => {
  return (dispatch, getState) => {
      const ws = getState().wsData.ws;
      ws.send(msg);
    }
  };
export const close = (players) => ({
  type: CLOSE
});
