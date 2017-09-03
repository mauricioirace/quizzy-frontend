import {
  LOAD_GAME,
  REMOVE_GAME,
} from '../constants/game';

export const loadGame = (input) => {
  return {
    type: LOAD_GAME,
    game: input,
  }
}

export const removeGame = () => {
  return {
    type: REMOVE_GAME,
  }
}
