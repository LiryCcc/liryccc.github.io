import { GAME_STATUS } from '@/constants/gomoku';
import { useI18n } from '@/hooks';
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
  const { t } = useI18n('gomoku');

  return (
    <div className={styles['controls']}>
      <Button onClick={onReset} appearance='primary'>
        {t('reset')}
      </Button>
      <Button onClick={onUndo} disabled={!canUndo || status !== GAME_STATUS.PLAYING}>
        {t('undo')}
      </Button>
    </div>
  );
};
