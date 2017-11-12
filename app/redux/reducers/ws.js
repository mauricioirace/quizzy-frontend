import { OPEN, CLOSE } from '../constants/ws';

const initialState = {
  ws: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN:
      const ws = new WebSocket(action.endpoint);
      if(action.onOpen) {
        ws.onopen = action.onOpen
      }
      ws.onmessage = action.onMessage;
      return {
        ws
      }
    case CLOSE:
      state.ws.close();
      return {
        ws: null
      }
    default:
      return state
  }
}
