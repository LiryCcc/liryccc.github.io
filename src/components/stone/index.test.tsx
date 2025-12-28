import { PLAYER } from '@/constants/gomoku';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Stone } from './index';

describe('Stone', () => {
  it('should render empty cell as button', () => {
    render(<Stone player={PLAYER.NONE} />);
    const button = screen.getByRole('button', { name: 'Empty cell' });
    expect(button).toBeTruthy();
  });

  it('should call onClick when empty cell is clicked', () => {
    const handleClick = vi.fn();
    render(<Stone player={PLAYER.NONE} onClick={handleClick} />);
    const button = screen.getByRole('button');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Stone player={PLAYER.NONE} onClick={handleClick} disabled />);
    const button = screen.getByRole('button');
    button.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should render black stone', () => {
    render(<Stone player={PLAYER.BLACK} />);
    const stone = screen.getByLabelText('Black stone');
    expect(stone).toBeTruthy();
    // Check that className contains the expected class (CSS modules hash the class names)
    expect(stone.className).toContain('stone-black');
  });

  it('should render white stone', () => {
    render(<Stone player={PLAYER.WHITE} />);
    const stone = screen.getByLabelText('White stone');
    expect(stone).toBeTruthy();
    // Check that className contains the expected class (CSS modules hash the class names)
    expect(stone.className).toContain('stone-white');
  });

  it('should not render button for occupied cells', () => {
    render(<Stone player={PLAYER.BLACK} />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
