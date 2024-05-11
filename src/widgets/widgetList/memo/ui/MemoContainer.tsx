import WidgetLayout from '../../layout/WidgetLayout';
import MemoContent from './MemoContent';
import { useWidgetLayerAction } from '@shared/stores/backgroundWidgetLayerStore';

type MemoContainerProps = {
  height: number;
};

const MemoContainer = ({ height }: MemoContainerProps) => {
  const { updateWidgetVisible } = useWidgetLayerAction();
  const handleClose = () => {
    updateWidgetVisible('MEMO', false);
  };
  return (
    <WidgetLayout height={`${height}px`} onClose={handleClose}>
      <MemoContent />
      <div>?</div>
    </WidgetLayout>
  );
};
export default MemoContainer;
