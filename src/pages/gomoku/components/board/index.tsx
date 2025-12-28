import { PLAYER } from '@/constants/gomoku';
import type { Board, Position } from '@/typings/gomoku';
import { Stone } from '../stone';
import styles from './index.module.css';

type BoardProps = {
  board: Board;
  onCellClick: (position: Position) => void;
  disabled?: boolean;
};

export const GameBoard = ({ board, onCellClick, disabled = false }: BoardProps) => {
  const handleCellClick = (row: number, col: number) => {
    if (!disabled && board[row][col] === PLAYER.NONE) {
      onCellClick({ row, col });
    }
  };

  return (
    <div className={styles['board']}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={styles['board-row']}>
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={styles['board-cell']}>
              <Stone
                player={cell}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                disabled={disabled || cell !== PLAYER.NONE}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
