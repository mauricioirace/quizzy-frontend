import {
  LOAD_MATCH,
} from '../constants/match';

export const loadMatch = input => {
  return {
    type: LOAD_MATCH,
    match: input,
  }
}
