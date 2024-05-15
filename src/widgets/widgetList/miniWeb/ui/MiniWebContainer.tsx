import styled from 'styled-components';
import WidgetLayout from '../../layout/WidgetLayout';
import UrlSettingBoard from './UrISettingBoard';
import { useWidgetLayerAction } from '@shared/stores/backgroundWidgetLayerStore';
import { useMiniWebStore } from '@shared/stores/miniWebStore';

type MiniWebContainerProps = {
  height: number;
};

const MiniWebContainer = ({ height }: MiniWebContainerProps) => {
  const { updateWidgetVisible } = useWidgetLayerAction();
  const { openUrl } = useMiniWebStore();
  const handleClose = () => {
    updateWidgetVisible('MINI_WEB', false);
  };

  return (
    <WidgetLayout
      height={`${height}px`}
      onClose={handleClose}
      SettingComponent={UrlSettingBoard}>
      {openUrl ? (
        <MiniWebWrapper>
          <MiniWeb src={openUrl} />
        </MiniWebWrapper>
      ) : (
        <UrlSettingBoard />
      )}
    </WidgetLayout>
  );
};

const MiniWebWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MiniWeb = styled.iframe`
  width: 95%;
  height: 100%;
  border: none;
`;
export default MiniWebContainer;
