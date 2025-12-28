import { GAME_STATUS, PLAYER } from '@/constants/gomoku';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GameStatusDisplay } from './index';

describe('GameStatusDisplay', () => {
  it('should display current player when playing', () => {
    render(<GameStatusDisplay currentPlayer={PLAYER.BLACK} status={GAME_STATUS.PLAYING} winner={PLAYER.NONE} />);
    expect(screen.getByText(/当前玩家: 黑子/)).toBeTruthy();
  });

  it('should display white player when playing', () => {
    render(<GameStatusDisplay currentPlayer={PLAYER.WHITE} status={GAME_STATUS.PLAYING} winner={PLAYER.NONE} />);
    expect(screen.getByText(/当前玩家: 白子/)).toBeTruthy();
  });

  it('should display black win message', () => {
    render(<GameStatusDisplay currentPlayer={PLAYER.BLACK} status={GAME_STATUS.BLACK_WIN} winner={PLAYER.BLACK} />);
    expect(screen.getByText('黑子获胜！')).toBeTruthy();
  });

  it('should display white win message', () => {
    render(<GameStatusDisplay currentPlayer={PLAYER.WHITE} status={GAME_STATUS.WHITE_WIN} winner={PLAYER.WHITE} />);
    expect(screen.getByText('白子获胜！')).toBeTruthy();
  });

  it('should display draw message', () => {
    render(<GameStatusDisplay currentPlayer={PLAYER.BLACK} status={GAME_STATUS.DRAW} winner={PLAYER.NONE} />);
    expect(screen.getByText('平局！')).toBeTruthy();
  });
});
