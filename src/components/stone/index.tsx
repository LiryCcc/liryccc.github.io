import { GOMOKU_POINT_STATUS } from '@/constants/gomoku';
import type { Player } from '@/typings/gomoku';
import styles from './index.module.css';

type StoneProps = {
  player: Player;
  onClick?: () => void;
  disabled?: boolean;
};

export const Stone = ({ player, onClick, disabled = false }: StoneProps) => {
  if (player === GOMOKU_POINT_STATUS.NONE) {
    return (
      <button type='button' className={styles['stone']} onClick={onClick} disabled={disabled} aria-label='Empty cell' />
    );
  }

  return (
    <div
      className={`${styles['stone']} ${styles[`stone-${player === GOMOKU_POINT_STATUS.BLACK ? 'black' : 'white'}`]}`}
      aria-label={player === GOMOKU_POINT_STATUS.BLACK ? 'Black stone' : 'White stone'}
    />
  );
};
