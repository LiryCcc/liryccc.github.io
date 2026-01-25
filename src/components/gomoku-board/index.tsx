import GomokuPoint from '@/components/gomoku-point';
import { BOARD_SIZE } from '@/constants';

import { createCn } from '@/utils/class-names';
import styles from './index.module.css';

const cn = createCn(styles);

const arr = Array.from<number>({ length: BOARD_SIZE });
const GomokuBoard = () => {
  return (
    <div className={cn('container')}>
      {arr.map((_, i) => {
        return (
          <div key={`row-${i}`} className={cn('row')}>
            {arr.map((_, j) => {
              return (
                <GomokuPoint key={`${i}-${j}`} status={'BLACK'} minIndex={0} maxIndex={BOARD_SIZE - 1} x={j} y={i} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GomokuBoard;
