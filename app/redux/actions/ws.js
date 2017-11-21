import { OPEN, CLOSE } from '../constants/ws';

export const open = (endpoint, onMessage) => ({
  type: OPEN,
  endpoint,
  onMessage
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
