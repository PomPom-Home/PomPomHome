import WidgetLayout from '../../layout/WidgetLayout';
import TodoApp from './TodoApp';
import { useWidgetLayerAction } from '@shared/stores/backgroundWidgetLayerStore';

type TodoContainerProps = {
  height: number;
};

const TodoContainer = ({ height }: TodoContainerProps) => {
  const { updateWidgetVisible } = useWidgetLayerAction();
  const handleClose = () => {
    updateWidgetVisible('TODO', false);
  };
  return (
    <WidgetLayout height={`${height}px`} onClose={handleClose}>
      <TodoApp />
    </WidgetLayout>
  );
};
export default TodoContainer;
