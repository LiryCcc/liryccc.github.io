import { GAME_STATUS, PLAYER } from '@/constants/gomoku';
import type { GameStatus, Player as PlayerType } from '@/typings/gomoku';
import { Text } from '@fluentui/react-components';
import styles from './index.module.css';

type GameStatusProps = {
  currentPlayer: PlayerType;
  status: GameStatus;
  winner: PlayerType;
};

export const GameStatusDisplay = ({ currentPlayer, status }: GameStatusProps) => {
  const getStatusText = () => {
    switch (status) {
      case GAME_STATUS.PLAYING:
        return `当前玩家: ${currentPlayer === PLAYER.BLACK ? '黑子' : '白子'}`;
      case GAME_STATUS.BLACK_WIN:
        return '黑子获胜！';
      case GAME_STATUS.WHITE_WIN:
        return '白子获胜！';
      case GAME_STATUS.DRAW:
        return '平局！';
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
