import { GAME_STATUS } from '@/constants/gomoku';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { GameControls } from './index';

describe('GameControls', () => {
  it('should render reset and undo buttons', () => {
    render(<GameControls status={GAME_STATUS.PLAYING} canUndo={true} onReset={vi.fn()} onUndo={vi.fn()} />);
    expect(screen.getByText('重新开始')).toBeTruthy();
    expect(screen.getByText('悔棋')).toBeTruthy();
  });

  it('should call onReset when reset button is clicked', () => {
    const handleReset = vi.fn();
    render(<GameControls status={GAME_STATUS.PLAYING} canUndo={true} onReset={handleReset} onUndo={vi.fn()} />);
    screen.getByText('重新开始').click();
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  it('should call onUndo when undo button is clicked', () => {
    const handleUndo = vi.fn();
    render(<GameControls status={GAME_STATUS.PLAYING} canUndo={true} onReset={vi.fn()} onUndo={handleUndo} />);
    screen.getByText('悔棋').click();
    expect(handleUndo).toHaveBeenCalledTimes(1);
  });

  it('should disable undo button when cannot undo', () => {
    render(<GameControls status={GAME_STATUS.PLAYING} canUndo={false} onReset={vi.fn()} onUndo={vi.fn()} />);
    const undoButton = screen.getByText('悔棋') as HTMLButtonElement;
    expect(undoButton.disabled).toBe(true);
  });

  it('should disable undo button when game is over', () => {
    render(<GameControls status={GAME_STATUS.BLACK_WIN} canUndo={true} onReset={vi.fn()} onUndo={vi.fn()} />);
    const undoButton = screen.getByText('悔棋') as HTMLButtonElement;
    expect(undoButton.disabled).toBe(true);
  });
});
