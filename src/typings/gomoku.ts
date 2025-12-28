import type { BOARD_SIZE, GAME_STATUS, PLAYER } from '@/constants/gomoku';

export type BoardSize = typeof BOARD_SIZE;
export type Player = (typeof PLAYER)[keyof typeof PLAYER];
export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];

export type Position = {
  row: number;
  col: number;
};

export type Board = Player[][];

export type GameState = {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  moveHistory: Position[];
  winner: Player;
};
