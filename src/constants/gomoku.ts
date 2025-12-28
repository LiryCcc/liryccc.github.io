export const BOARD_SIZE = 15;

export const PLAYER = {
  NONE: 0,
  BLACK: 1,
  WHITE: 2
} as const;

export const GAME_STATUS = {
  PLAYING: 'playing',
  BLACK_WIN: 'black_win',
  WHITE_WIN: 'white_win',
  DRAW: 'draw'
} as const;
