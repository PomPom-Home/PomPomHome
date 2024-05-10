import WidgetLayout from '../../layout/WidgetLayout';
import MemoContent from './MemoContent';
type MemoContainerProps = {
  height: number;
};

const MemoContainer = ({ height }: MemoContainerProps) => {
  const handleClose = () => {
    console.log('close>>>', height);
  };
  return (
    <WidgetLayout height={`${height}px`} onClose={handleClose}>
      <MemoContent />
      <div>?</div>
    </WidgetLayout>
  );
};
export default MemoContainer;
