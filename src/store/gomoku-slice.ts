import { GAME_STATUS, PLAYER } from '@/constants/gomoku';
import type { GameState, Position } from '@/typings/gomoku';
import { getGameStatus, initializeGame, makeMove as makeMoveUtil } from '@/utils/gomoku';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: GameState = initializeGame();

const gomokuSlice = createSlice({
  name: 'gomoku',
  initialState,
  reducers: {
    makeMove: (state, action: PayloadAction<Position>) => {
      const { row, col } = action.payload;

      if (state.status !== GAME_STATUS.PLAYING) {
        return;
      }

      if (state.board[row]![col] !== PLAYER.NONE) {
        return;
      }

      const newBoard = makeMoveUtil(state.board, row, col, state.currentPlayer);
      const newMoveHistory = [...state.moveHistory, { row, col }];
      const gameResult = getGameStatus(newBoard, { row, col }, state.currentPlayer);

      state.board = newBoard;
      state.moveHistory = newMoveHistory;
      state.status = gameResult.status as GameState['status'];
      state.winner = gameResult.winner;

      if (gameResult.status === GAME_STATUS.PLAYING) {
        state.currentPlayer = state.currentPlayer === PLAYER.BLACK ? PLAYER.WHITE : PLAYER.BLACK;
      }
    },
    resetGame: () => {
      return initializeGame();
    },
    undoMove: (state) => {
      if (state.moveHistory.length === 0 || state.status !== GAME_STATUS.PLAYING) {
        return;
      }

      const lastMove = state.moveHistory[state.moveHistory.length - 1];
      const newBoard = state.board.map((r) => [...r]);
      newBoard[lastMove!.row]![lastMove!.col] = PLAYER.NONE;

      const newMoveHistory = state.moveHistory.slice(0, -1);

      state.board = newBoard;
      state.moveHistory = newMoveHistory;
      state.currentPlayer = state.currentPlayer === PLAYER.BLACK ? PLAYER.WHITE : PLAYER.BLACK;
      state.status = GAME_STATUS.PLAYING;
      state.winner = PLAYER.NONE;
    }
  }
});

export const { makeMove, resetGame, undoMove } = gomokuSlice.actions;
export default gomokuSlice.reducer;
