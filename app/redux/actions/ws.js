import { OPEN, CLOSE } from '../constants/ws';

export const open = (endpoint, onMessage) => ({
  type: OPEN,
  endpoint,
  onMessage
});

export const close = (players) => ({
  type: CLOSE
});
