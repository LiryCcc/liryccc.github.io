import { GAME_STATUS, PLAYER } from '@/constants/gomoku';
import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it } from 'vitest';
import gomokuReducer, { makeMove, resetGame, undoMove } from './gomoku-slice';

describe('gomoku slice', () => {
  const createStore = () => {
    return configureStore({
      reducer: {
        gomoku: gomokuReducer
      }
    });
  };

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const store = createStore();
      const state = store.getState().gomoku;
      expect(state.currentPlayer).toBe(PLAYER.BLACK);
      expect(state.status).toBe(GAME_STATUS.PLAYING);
      expect(state.moveHistory).toHaveLength(0);
      expect(state.winner).toBe(PLAYER.NONE);
    });
  });

  describe('makeMove', () => {
    it('should place a stone on empty cell', () => {
      const store = createStore();
      store.dispatch(makeMove({ row: 0, col: 0 }));
      const state = store.getState().gomoku;
      expect(state.board[0]![0]).toBe(PLAYER.BLACK);
      expect(state.currentPlayer).toBe(PLAYER.WHITE);
      expect(state.moveHistory).toHaveLength(1);
    });

    it('should not place a stone on occupied cell', () => {
      const store = createStore();
      store.dispatch(makeMove({ row: 0, col: 0 }));
      const initialState = store.getState().gomoku;
      store.dispatch(makeMove({ row: 0, col: 0 }));
      const state = store.getState().gomoku;
      expect(state.board[0]![0]).toBe(PLAYER.BLACK);
      expect(state.moveHistory).toHaveLength(1);
      expect(state.currentPlayer).toBe(initialState.currentPlayer);
    });

    it('should detect win and end game', () => {
      const store = createStore();
      // Create a horizontal win for black
      for (let i = 0; i < 4; i++) {
        store.dispatch(makeMove({ row: 0, col: i }));
        store.dispatch(makeMove({ row: 1, col: i }));
      }
      store.dispatch(makeMove({ row: 0, col: 4 }));
      const state = store.getState().gomoku;
      expect(state.status).toBe(GAME_STATUS.BLACK_WIN);
      expect(state.winner).toBe(PLAYER.BLACK);
    });

    it('should not allow moves after game ends', () => {
      const store = createStore();
      // Create a win
      for (let i = 0; i < 4; i++) {
        store.dispatch(makeMove({ row: 0, col: i }));
        store.dispatch(makeMove({ row: 1, col: i }));
      }
      store.dispatch(makeMove({ row: 0, col: 4 }));
      const stateBefore = store.getState().gomoku;
      store.dispatch(makeMove({ row: 2, col: 0 }));
      const stateAfter = store.getState().gomoku;
      expect(stateAfter.board[2]![0]).toBe(PLAYER.NONE);
      expect(stateAfter.moveHistory).toEqual(stateBefore.moveHistory);
    });
  });

  describe('resetGame', () => {
    it('should reset game to initial state', () => {
      const store = createStore();
      store.dispatch(makeMove({ row: 0, col: 0 }));
      store.dispatch(makeMove({ row: 0, col: 1 }));
      store.dispatch(resetGame());
      const state = store.getState().gomoku;
      expect(state.board[0]![0]).toBe(PLAYER.NONE);
      expect(state.currentPlayer).toBe(PLAYER.BLACK);
      expect(state.status).toBe(GAME_STATUS.PLAYING);
      expect(state.moveHistory).toHaveLength(0);
      expect(state.winner).toBe(PLAYER.NONE);
    });
  });

  describe('undoMove', () => {
    it('should undo last move', () => {
      const store = createStore();
      store.dispatch(makeMove({ row: 0, col: 0 }));
      store.dispatch(makeMove({ row: 0, col: 1 }));
      store.dispatch(undoMove());
      const stateAfter = store.getState().gomoku;
      expect(stateAfter!.board[0]![1]).toBe(PLAYER.NONE);
      expect(stateAfter.currentPlayer).toBe(PLAYER.BLACK);
      expect(stateAfter.moveHistory).toHaveLength(1);
      expect(stateAfter.status).toBe(GAME_STATUS.PLAYING);
    });

    it('should not undo when no moves', () => {
      const store = createStore();
      const initialState = store.getState().gomoku;
      store.dispatch(undoMove());
      const state = store.getState().gomoku;
      expect(state).toEqual(initialState);
    });

    it('should not undo when game is over', () => {
      const store = createStore();
      // Create a win
      for (let i = 0; i < 4; i++) {
        store.dispatch(makeMove({ row: 0, col: i }));
        store.dispatch(makeMove({ row: 1, col: i }));
      }
      store.dispatch(makeMove({ row: 0, col: 4 }));
      const stateBefore = store.getState().gomoku;
      store.dispatch(undoMove());
      const stateAfter = store.getState().gomoku;
      expect(stateAfter).toEqual(stateBefore);
    });
  });
});
