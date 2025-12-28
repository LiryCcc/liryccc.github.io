import { BOARD_SIZE, PLAYER } from '@/constants/gomoku';
import type { Board, Position } from '@/typings/gomoku';
import { Cell } from './cell';
import styles from './index.module.css';

type BoardProps = {
  board: Board;
  onCellClick: (position: Position) => void;
  disabled?: boolean;
};

export const GameBoard = ({ board, onCellClick, disabled = false }: BoardProps) => {
  const handleCellClick = (row: number, col: number) => {
    if (!disabled && board[row]![col] === PLAYER.NONE) {
      onCellClick({ row, col });
    }
  };

  return (
    <div className={styles['board']}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={styles['board-row']}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              row={rowIndex}
              col={colIndex}
              player={cell}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              disabled={disabled}
              isFirstRow={rowIndex === 0}
              isLastRow={rowIndex === BOARD_SIZE - 1}
              isFirstCol={colIndex === 0}
              isLastCol={colIndex === BOARD_SIZE - 1}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
