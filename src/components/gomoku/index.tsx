'use client';

import { useCallback, useState } from 'react';
import styles from './index.module.scss';

type Player = 'black' | 'white' | null;
type Board = Player[][];

const BOARD_SIZE = 15;

const Gomoku = () => {
  const [board, setBoard] = useState<Board>(
    Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>('black');
  const [winner, setWinner] = useState<Player | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = useCallback((board: Board, row: number, col: number, player: Player): boolean => {
    if (!player) return false;

    const directions: [number, number][] = [
      [0, 1], // 水平
      [1, 0], // 垂直
      [1, 1], // 主对角线
      [1, -1] // 副对角线
    ];

    for (const direction of directions) {
      const [dx, dy] = direction;
      let count = 1; // 包含当前棋子

      // 正向检查
      for (let i = 1; i < 5; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        if (
          newRow >= 0 &&
          newRow < BOARD_SIZE &&
          newCol >= 0 &&
          newCol < BOARD_SIZE &&
          board[newRow]?.[newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }

      // 反向检查
      for (let i = 1; i < 5; i++) {
        const newRow = row - dx * i;
        const newCol = col - dy * i;
        if (
          newRow >= 0 &&
          newRow < BOARD_SIZE &&
          newCol >= 0 &&
          newCol < BOARD_SIZE &&
          board[newRow]?.[newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 5) {
        return true;
      }
    }

    return false;
  }, []);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (board[row]?.[col] || gameOver || winner) {
        return;
      }

      const newBoard = board.map((r) => [...r]);
      if (newBoard[row]) {
        newBoard[row][col] = currentPlayer;
      }

      setBoard(newBoard);

      if (checkWinner(newBoard, row, col, currentPlayer)) {
        setWinner(currentPlayer);
        setGameOver(true);
      } else {
        setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
      }
    },
    [board, currentPlayer, gameOver, winner, checkWinner]
  );

  const handleReset = useCallback(() => {
    setBoard(
      Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(null))
    );
    setCurrentPlayer('black');
    setWinner(null);
    setGameOver(false);
  }, []);

  const getPlayerName = (player: Player) => {
    if (player === 'black') return '黑棋';
    if (player === 'white') return '白棋';
    return '';
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h1 className={styles['title']}>五子棋</h1>
        <div className={styles['status']}>
          {winner ? (
            <div className={styles['winner']}>
              <span className={styles['winner-text']}>🎉 {getPlayerName(winner)} 获胜！</span>
            </div>
          ) : (
            <div className={styles['current-player']}>
              <span>当前玩家：</span>
              <span className={currentPlayer === 'black' ? styles['black-player'] : styles['white-player']}>
                {getPlayerName(currentPlayer)}
              </span>
            </div>
          )}
        </div>
        <button className={styles['reset-button']} onClick={handleReset}>
          重新开始
        </button>
      </div>

      <div className={styles['board']}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className={styles['row']}>
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={styles['cell']}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell && (
                  <div
                    className={`${styles['stone']} ${cell === 'black' ? styles['black-stone'] : styles['white-stone']}`}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gomoku;
