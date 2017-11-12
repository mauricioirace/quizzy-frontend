export const TIME_TO_ANSWER = 15;
export const PROGRESS_HEIGHT = 10;
export const PROGRESS_COLOR = '#ff8d40';

// States
export const WAITING_STATE = 0;
export const ANSWERING_STATE = 1;
export const ANSWERED_STATE = 2;
export const FINISHED_STATE = 3;

// Client Actions
export const READY_ACTION = 0;
export const ANSWERED_ACTION = 1;
export const TIMEOUT_ACTION = 2;
export const NEXT_ACTION = 3;
export const END_MATCH_ACTION = 4;

// Signals sent by server
export const START_SIGNAL = 0;
export const ANSWERED_SIGNAL = 1;
export const NEXT_SIGNAL = 2;
export const END_MATCH_SIGNAL = 3;
