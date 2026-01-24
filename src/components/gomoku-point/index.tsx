import { createCn } from '@/utils/class-names';
import type { FC } from 'react';
import styles from './index.module.css';
import { type GomokuPointProps } from './utils';

const cn = createCn(styles);

/**
 * 单个点的组件，
 * 从左下开始 x y定位，坐标从0开始, 0, 0是左下角
 */

const GomokuPoint: FC<GomokuPointProps> = ({ minIndex, maxIndex, x, y }) => {
  // 如果x < maxIndex，则有right line
  const haveRightLine = x < maxIndex;
  // 如果x > minIndex, 则有left line
  const haveLeftLine = x > minIndex;
  // 如果y < maxIndex, 则有top line
  const haveTopLine = y < maxIndex;
  // 如果y > minIndex，则有bottom line
  const haveBottomLine = y > minIndex;
  return (
    <div className={styles['container']}>
      <div className={cn('line', 'horizontal-line', haveLeftLine ? 'left-line' : 'none')} />
      <div className={cn('line', 'horizontal-line', haveRightLine ? 'right-line' : 'none')} />
      <div className={cn('line', 'vertical-line', haveTopLine ? 'top-line' : 'none')} />
      <div className={cn('line', 'vertical-line', haveBottomLine ? 'bottom-line' : 'none')} />
      <div className={cn('square', 'line')} />
    </div>
  );
};

export default GomokuPoint;
