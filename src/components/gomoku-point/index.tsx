import type { FC } from 'react';
import styles from './index.module.css';
import type { GomokuPointProps } from './utils';

/**
 * 单个点的组件，
 * 从左下开始 x y定位，坐标从0开始
 */

const GomokuPoint: FC<GomokuPointProps> = () => {
  console.log(styles);
  return <div className={styles['container']}></div>;
};

export default GomokuPoint;
