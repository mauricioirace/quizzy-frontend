import {
  LOAD_CURRENT_MATCH,
  REMOVE_CURRENT_MATCH,
} from '../constants/currentMatch';

export const loadCurrentMatch = (input) => {
  return {
    type: LOAD_CURRENT_MATCH,
    currentMatch: input,
  }
}

export const removeCurrentMatch = () => {
  return {
    type: REMOVE_CURRENT_MATCH,
  }
}
