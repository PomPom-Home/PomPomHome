import WidgetLayout from '../../layout/WidgetLayout';
import { useWidgetLayerAction } from '@shared/stores/backgroundWidgetLayerStore';

type MiniWebContainerProps = {
  height: number;
};

const MiniWebContainer = ({ height }: MiniWebContainerProps) => {
  const { updateWidgetVisible } = useWidgetLayerAction();
  const handleClose = () => {
    updateWidgetVisible('MINI_WEB', false);
  };
  return (
    <WidgetLayout height={`${height}px`} onClose={handleClose}>
      <div>MiniWEB!!!</div>
    </WidgetLayout>
  );
};
export default MiniWebContainer;
