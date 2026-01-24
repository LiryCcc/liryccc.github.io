import { GameBoard } from '@/components/board';
import { GameControls } from '@/components/game-controls';
import { GameStatusDisplay } from '@/components/game-status';
import { GAME_STATUS } from '@/constants/gomoku';
import { useI18n } from '@/hooks';
import { makeMove, resetGame, undoMove } from '@/store/gomoku-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { Position } from '@/typings/gomoku';
import { Title1 } from '@fluentui/react-components';
import styles from './index.module.css';

const Gomoku = () => {
  const { t } = useI18n('gomoku');
  const dispatch = useAppDispatch();
  const { board, currentPlayer, status, moveHistory, winner } = useAppSelector((state) => state.gomoku);

  const handleCellClick = (position: Position) => {
    dispatch(makeMove(position));
  };

  const handleReset = () => {
    dispatch(resetGame());
  };

  const handleUndo = () => {
    dispatch(undoMove());
  };

  const isGameOver = status !== GAME_STATUS.PLAYING;

  return (
    <div className={styles['gomoku']}>
      <div className={styles['container']}>
        <Title1 as='h1' className={styles['title']}>
          {t('title')}
        </Title1>
        <GameStatusDisplay currentPlayer={currentPlayer} status={status} winner={winner} />
        <div className={styles['board-wrapper']}>
          <GameBoard board={board} onCellClick={handleCellClick} disabled={isGameOver} />
        </div>
        <GameControls status={status} canUndo={moveHistory.length > 0} onReset={handleReset} onUndo={handleUndo} />
      </div>
    </div>
  );
};

export default Gomoku;
