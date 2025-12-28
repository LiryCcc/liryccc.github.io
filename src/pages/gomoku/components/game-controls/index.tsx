import { GAME_STATUS } from '@/constants/gomoku';
import type { GameStatus } from '@/typings/gomoku';
import { Button } from '@fluentui/react-components';
import styles from './index.module.css';

type GameControlsProps = {
  status: GameStatus;
  canUndo: boolean;
  onReset: () => void;
  onUndo: () => void;
};

export const GameControls = ({ status, canUndo, onReset, onUndo }: GameControlsProps) => {
  return (
    <div className={styles['controls']}>
      <Button onClick={onReset} appearance='primary'>
        重新开始
      </Button>
      <Button onClick={onUndo} disabled={!canUndo || status !== GAME_STATUS.PLAYING}>
        悔棋
      </Button>
    </div>
  );
};
