import GomokuPoint from '@/components/gomoku-point';
import { Stone } from '@/components/stone';
import { GOMOKU_POINT_STATUS } from '@/constants/gomoku';
import { Button } from '@fluentui/react-components';

const Dev = () => {
  return (
    <div>
      <div>
        <Button>{123}</Button>
        <Button>{456}</Button>
      </div>
      <div>
        <Stone player={GOMOKU_POINT_STATUS.BLACK} />
        <Stone player={GOMOKU_POINT_STATUS.WHITE} />
      </div>
      <div>
        <GomokuPoint minIndex={0} maxIndex={0} x={0} y={0} status={'NONE'}></GomokuPoint>
      </div>
    </div>
  );
};

export default Dev;
