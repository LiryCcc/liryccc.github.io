import { BOARD_SIZE, GAME_STATUS, PLAYER } from '@/constants/gomoku';
import type { Board, GameState, Player, Position } from '@/typings/gomoku';

export const createEmptyBoard = (): Board => {
  return Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(PLAYER.NONE) as Player[]);
};

export const isValidPosition = (row: number, col: number): boolean => {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
};

export const isEmptyCell = (board: Board, row: number, col: number): boolean => {
  if (!isValidPosition(row, col)) {
    return false;
  }
  const cell = board[row];
  return cell !== undefined && cell[col] === PLAYER.NONE;
};

export const makeMove = (board: Board, row: number, col: number, player: Player): Board => {
  if (!isEmptyCell(board, row, col)) {
    return board;
  }

  const newBoard = board.map((r) => [...r]);
  const rowArray = newBoard[row];
  if (rowArray !== undefined) {
    rowArray[col] = player;
  }
  return newBoard;
};

export const checkDirection = (
  board: Board,
  row: number,
  col: number,
  player: Player,
  deltaRow: number,
  deltaCol: number
): number => {
  let count = 0;
  let currentRow = row;
  let currentCol = col;

  while (isValidPosition(currentRow, currentCol)) {
    const rowArray = board[currentRow];
    if (rowArray === undefined || rowArray[currentCol] !== player) {
      break;
    }
    count++;
    currentRow += deltaRow;
    currentCol += deltaCol;
  }

  return count;
};

export const checkWin = (board: Board, row: number, col: number, player: Player): boolean => {
  const directions: [number, number][] = [
    [0, 1], // 水平
    [1, 0], // 垂直
    [1, 1], // 主对角线
    [1, -1] // 副对角线
  ];

  for (const direction of directions) {
    const [deltaRow, deltaCol] = direction;
    if (deltaRow === undefined || deltaCol === undefined) {
      continue;
    }
    const forward = checkDirection(board, row, col, player, deltaRow, deltaCol);
    const backward = checkDirection(board, row, col, player, -deltaRow, -deltaCol);
    const total = forward + backward - 1;

    if (total >= 5) {
      return true;
    }
  }

  return false;
};

export const checkDraw = (board: Board): boolean => {
  return board.every((row) => row.every((cell) => cell !== PLAYER.NONE));
};

export const getNextPlayer = (currentPlayer: Player): Player => {
  return currentPlayer === PLAYER.BLACK ? PLAYER.WHITE : PLAYER.BLACK;
};

export const initializeGame = (): GameState => {
  return {
    board: createEmptyBoard(),
    currentPlayer: PLAYER.BLACK,
    status: GAME_STATUS.PLAYING,
    moveHistory: [],
    winner: PLAYER.NONE
  };
};

export const getGameStatus = (
  board: Board,
  lastMove: Position | null,
  player: Player
): { status: string; winner: Player } => {
  if (lastMove && checkWin(board, lastMove.row, lastMove.col, player)) {
    return {
      status: player === PLAYER.BLACK ? GAME_STATUS.BLACK_WIN : GAME_STATUS.WHITE_WIN,
      winner: player
    };
  }

  if (checkDraw(board)) {
    return {
      status: GAME_STATUS.DRAW,
      winner: PLAYER.NONE
    };
  }

  return {
    status: GAME_STATUS.PLAYING,
    winner: PLAYER.NONE
  };
};
