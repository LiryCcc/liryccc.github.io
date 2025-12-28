import { Stone } from '@/components/stone';
import { PLAYER } from '@/constants/gomoku';
import type { Player } from '@/typings/gomoku';
import styles from './cell.module.css';

type CellProps = {
  row: number;
  col: number;
  player: Player;
  onClick: () => void;
  disabled?: boolean;
  isFirstRow: boolean;
  isLastRow: boolean;
  isFirstCol: boolean;
  isLastCol: boolean;
};

export const Cell = ({
  row,
  col,
  player,
  onClick,
  disabled = false,
  isFirstRow,
  isLastRow,
  isFirstCol,
  isLastCol
}: CellProps) => {
  const hasStone = player !== PLAYER.NONE;

  return (
    <div
      className={`${styles['cell']} ${isFirstRow ? styles['cell-first-row'] : ''} ${isLastRow ? styles['cell-last-row'] : ''} ${isFirstCol ? styles['cell-first-col'] : ''} ${isLastCol ? styles['cell-last-col'] : ''}`}
      data-row={row}
      data-col={col}
      aria-label={`Cell at row ${row + 1}, column ${col + 1}`}
    >
      <Stone player={player} onClick={onClick} disabled={disabled || hasStone} />
    </div>
  );
};
