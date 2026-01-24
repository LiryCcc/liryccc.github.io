import { GAME_STATUS, PLAYER } from '@/constants/gomoku';
import { useI18n } from '@/hooks';
import type { GameStatus, Player as PlayerType } from '@/typings/gomoku';
import { Text } from '@fluentui/react-components';
import styles from './index.module.css';

type GameStatusProps = {
  currentPlayer: PlayerType;
  status: GameStatus;
  winner: PlayerType;
};

export const GameStatusDisplay = ({ currentPlayer, status }: GameStatusProps) => {
  const { t } = useI18n('gomoku');

  const getStatusText = () => {
    switch (status) {
      case GAME_STATUS.PLAYING:
        return `${t('currentPlayer')}: ${currentPlayer === PLAYER.BLACK ? t('black') : t('white')}`;
      case GAME_STATUS.BLACK_WIN:
        return t('blackWin');
      case GAME_STATUS.WHITE_WIN:
        return t('whiteWin');
      case GAME_STATUS.DRAW:
        return t('draw');
      default:
        return '';
    }
  };

  return (
    <div className={styles['status']}>
      <Text size={500} weight='semibold'>
        {getStatusText()}
      </Text>
    </div>
  );
};
