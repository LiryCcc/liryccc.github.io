import GomokuBoard from '@/components/gomoku-board';
import { Button } from '@fluentui/react-components';

const Dev = () => {
  return (
    <div>
      <div>
        <Button>{123}</Button>
        <Button>{456}</Button>
      </div>
      <GomokuBoard></GomokuBoard>
    </div>
  );
};

export default Dev;
