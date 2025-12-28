import { BOARD_SIZE, GAME_STATUS, PLAYER } from '@/constants/gomoku';
import { describe, expect, it } from 'vitest';
import {
  checkDraw,
  checkWin,
  createEmptyBoard,
  getGameStatus,
  getNextPlayer,
  initializeGame,
  isEmptyCell,
  isValidPosition,
  makeMove
} from './gomoku';

describe('gomoku utils', () => {
  describe('createEmptyBoard', () => {
    it('should create an empty board with correct size', () => {
      const board = createEmptyBoard();
      expect(board).toHaveLength(BOARD_SIZE);
      expect(board[0]).toHaveLength(BOARD_SIZE);
      expect(board[0]![0]).toBe(PLAYER.NONE);
    });
  });

  describe('isValidPosition', () => {
    it('should return true for valid positions', () => {
      expect(isValidPosition(0, 0)).toBe(true);
      expect(isValidPosition(BOARD_SIZE - 1, BOARD_SIZE - 1)).toBe(true);
      expect(isValidPosition(7, 7)).toBe(true);
    });

    it('should return false for invalid positions', () => {
      expect(isValidPosition(-1, 0)).toBe(false);
      expect(isValidPosition(0, -1)).toBe(false);
      expect(isValidPosition(BOARD_SIZE, 0)).toBe(false);
      expect(isValidPosition(0, BOARD_SIZE)).toBe(false);
    });
  });

  describe('isEmptyCell', () => {
    it('should return true for empty cells', () => {
      const board = createEmptyBoard();
      expect(isEmptyCell(board, 0, 0)).toBe(true);
    });

    it('should return false for occupied cells', () => {
      const board = createEmptyBoard();
      board[0]![0] = PLAYER.BLACK;
      expect(isEmptyCell(board, 0, 0)).toBe(false);
    });

    it('should return false for invalid positions', () => {
      const board = createEmptyBoard();
      expect(isEmptyCell(board, -1, 0)).toBe(false);
    });
  });

  describe('makeMove', () => {
    it('should place a stone on empty cell', () => {
      const board = createEmptyBoard();
      const newBoard = makeMove(board, 0, 0, PLAYER.BLACK);
      expect(newBoard[0]![0]).toBe(PLAYER.BLACK);
      expect(board[0]![0]).toBe(PLAYER.NONE); // original board unchanged
    });

    it('should not place a stone on occupied cell', () => {
      const board = createEmptyBoard();
      board[0]![0] = PLAYER.BLACK;
      const newBoard = makeMove(board, 0, 0, PLAYER.WHITE);
      expect(newBoard[0]![0]).toBe(PLAYER.BLACK);
    });
  });

  describe('checkWin', () => {
    it('should detect horizontal win', () => {
      const board = createEmptyBoard();
      for (let i = 0; i < 5; i++) {
        board[0]![i] = PLAYER.BLACK;
      }
      expect(checkWin(board, 0, 2, PLAYER.BLACK)).toBe(true);
    });

    it('should detect vertical win', () => {
      const board = createEmptyBoard();
      for (let i = 0; i < 5; i++) {
        board[i]![0] = PLAYER.BLACK;
      }
      expect(checkWin(board, 2, 0, PLAYER.BLACK)).toBe(true);
    });

    it('should detect diagonal win (main)', () => {
      const board = createEmptyBoard();
      for (let i = 0; i < 5; i++) {
        board[i]![i] = PLAYER.BLACK;
      }
      expect(checkWin(board, 2, 2, PLAYER.BLACK)).toBe(true);
    });

    it('should detect diagonal win (anti)', () => {
      const board = createEmptyBoard();
      for (let i = 0; i < 5; i++) {
        board[i]![4 - i] = PLAYER.BLACK;
      }
      expect(checkWin(board, 2, 2, PLAYER.BLACK)).toBe(true);
    });

    it('should not detect win for less than 5 in a row', () => {
      const board = createEmptyBoard();
      for (let i = 0; i < 4; i++) {
        board[0]![i] = PLAYER.BLACK;
      }
      expect(checkWin(board, 0, 1, PLAYER.BLACK)).toBe(false);
    });

    it('should not detect win for different player', () => {
      const board = createEmptyBoard();
      for (let i = 0; i < 5; i++) {
        board[0]![i] = PLAYER.BLACK;
      }
      expect(checkWin(board, 0, 2, PLAYER.WHITE)).toBe(false);
    });
  });

  describe('checkDraw', () => {
    it('should return true when board is full', () => {
      const board = createEmptyBoard();
      for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
          board[i]![j] = (i + j) % 2 === 0 ? PLAYER.BLACK : PLAYER.WHITE;
        }
      }
      expect(checkDraw(board)).toBe(true);
    });

    it('should return false when board has empty cells', () => {
      const board = createEmptyBoard();
      expect(checkDraw(board)).toBe(false);
    });
  });

  describe('getNextPlayer', () => {
    it('should return WHITE when current is BLACK', () => {
      expect(getNextPlayer(PLAYER.BLACK)).toBe(PLAYER.WHITE);
    });

    it('should return BLACK when current is WHITE', () => {
      expect(getNextPlayer(PLAYER.WHITE)).toBe(PLAYER.BLACK);
    });
  });

  describe('initializeGame', () => {
    it('should initialize game with correct state', () => {
      const game = initializeGame();
      expect(game.board).toHaveLength(BOARD_SIZE);
      expect(game.currentPlayer).toBe(PLAYER.BLACK);
      expect(game.status).toBe(GAME_STATUS.PLAYING);
      expect(game.moveHistory).toHaveLength(0);
      expect(game.winner).toBe(PLAYER.NONE);
    });
  });

  describe('getGameStatus', () => {
    it('should return playing status when no win', () => {
      const board = createEmptyBoard();
      board[0]![0] = PLAYER.BLACK;
      const result = getGameStatus(board, { row: 0, col: 0 }, PLAYER.BLACK);
      expect(result.status).toBe(GAME_STATUS.PLAYING);
      expect(result.winner).toBe(PLAYER.NONE);
    });

    it('should return black win when black wins', () => {
      const board = createEmptyBoard();
      for (let i = 0; i < 5; i++) {
        board[0]![i] = PLAYER.BLACK;
      }
      const result = getGameStatus(board, { row: 0, col: 2 }, PLAYER.BLACK);
      expect(result.status).toBe(GAME_STATUS.BLACK_WIN);
      expect(result.winner).toBe(PLAYER.BLACK);
    });

    it('should return white win when white wins', () => {
      const board = createEmptyBoard();
      for (let i = 0; i < 5; i++) {
        board[0]![i] = PLAYER.WHITE;
      }
      const result = getGameStatus(board, { row: 0, col: 2 }, PLAYER.WHITE);
      expect(result.status).toBe(GAME_STATUS.WHITE_WIN);
      expect(result.winner).toBe(PLAYER.WHITE);
    });

    it('should return draw when board is full', () => {
      const board = createEmptyBoard();
      // Fill board with a pattern that ensures no 5 in a row
      // Use a pattern that switches every 4 positions to ensure max 4 consecutive same colors
      for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
          // Pattern: every 4 positions switch color, and also alternate by row
          // This breaks up any potential 5-in-a-row patterns
          const blockCol = Math.floor(j / 4);
          const rowOffset = i % 2;
          // Alternate: even blocks in even rows = BLACK, odd blocks in even rows = WHITE
          // This creates a pattern that prevents 5 consecutive in any direction
          board[i]![j] = blockCol % 2 === rowOffset ? PLAYER.BLACK : PLAYER.WHITE;
        }
      }
      // Use a position that's safe (not on a potential winning line)
      // With our pattern, position (7, 7) should be safe
      const result = getGameStatus(board, { row: 7, col: 7 }, PLAYER.BLACK);
      expect(result.status).toBe(GAME_STATUS.DRAW);
      expect(result.winner).toBe(PLAYER.NONE);
    });
  });
});
