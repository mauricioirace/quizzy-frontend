import { OPEN, CLOSE } from '../constants/ws';

const initialState = {
  ws: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN:
      console.log(action);
      const ws = new WebSocket(action.endpoint);
      ws.message = action.onMessage;
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