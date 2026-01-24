import { GOMOKU_POINT_STATUS } from '@/constants/gomoku';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { GameBoard } from './index';

describe('GameBoard', () => {
  const createEmptyBoard = () => {
    return Array(15)
      .fill(null)
      .map(() => Array(15).fill(GOMOKU_POINT_STATUS.NONE));
  };

  it('should render board with correct size', () => {
    const board = createEmptyBoard();
    render(<GameBoard board={board} onCellClick={vi.fn()} />);
    const cells = screen.getAllByRole('button', { name: 'Empty cell' });
    expect(cells).toHaveLength(15 * 15);
  });

  it('should call onCellClick when empty cell is clicked', () => {
    const board = createEmptyBoard();
    const handleClick = vi.fn();
    render(<GameBoard board={board} onCellClick={handleClick} />);
    const firstCell = screen.getAllByRole('button')[0];
    firstCell?.click();
    expect(handleClick).toHaveBeenCalledWith({ row: 0, col: 0 });
  });

  it('should not call onCellClick when cell is occupied', () => {
    const board = createEmptyBoard();
    board[0]![0] = GOMOKU_POINT_STATUS.BLACK;
    const handleClick = vi.fn();
    render(<GameBoard board={board} onCellClick={handleClick} />);
    const stone = screen.getByLabelText('Black stone');
    stone.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should not call onCellClick when disabled', () => {
    const board = createEmptyBoard();
    const handleClick = vi.fn();
    render(<GameBoard board={board} onCellClick={handleClick} disabled />);
    const firstCell = screen.getAllByRole('button')[0];
    firstCell?.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should render stones correctly', () => {
    const board = createEmptyBoard();
    board[0]![0] = GOMOKU_POINT_STATUS.BLACK;
    board[0]![1] = GOMOKU_POINT_STATUS.WHITE;
    render(<GameBoard board={board} onCellClick={vi.fn()} />);
    expect(screen.getByLabelText('Black stone')).toBeTruthy();
    expect(screen.getByLabelText('White stone')).toBeTruthy();
  });
});
