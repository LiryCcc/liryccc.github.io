import GomokuPoint from '@/components/gomoku-point';
import { Button } from '@fluentui/react-components';

const Dev = () => {
  return (
    <div>
      <div>
        <Button>{123}</Button>
        <Button>{456}</Button>
      </div>

      <div>
        <GomokuPoint minIndex={0} maxIndex={1} x={0} y={0} status={'NONE'}></GomokuPoint>
        <GomokuPoint minIndex={0} maxIndex={1} x={0} y={1} status={'NONE'}></GomokuPoint>
        <GomokuPoint minIndex={0} maxIndex={1} x={1} y={0} status={'NONE'}></GomokuPoint>
        <GomokuPoint minIndex={0} maxIndex={1} x={1} y={1} status={'NONE'}></GomokuPoint>
      </div>
    </div>
  );
};

export default Dev;
