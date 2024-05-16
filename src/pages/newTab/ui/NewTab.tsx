import { useBackground } from '@shared/stores/backgroundWidgetLayerStore';
import FixedButtonWithPopper from '@shared/ui/FixedButtonWithPopper';
import WidgetLayer from 'src/widgets/widgetLayer/ui/WidgetLayer';
import BackgroundSelector from 'src/widgets/widgetList/backgroundSelector/ui/BackgroundSelector';
import styled from 'styled-components';
import { FaImage } from 'react-icons/fa6';
import { FiPlus } from 'react-icons/fi';

import WidgetSelector from 'src/widgets/widgetList/widgetSelector/ui/WidgetSelector';

const NewTab = () => {
  const { backgroundType, color, imageUrl } = useBackground();

  return (
    <main>
      <WidgetLayer />
      <FixedButtonWithPopper
        position={{ bottom: 80, right: 10 }}
        poppedChildren={<BackgroundSelector />}>
        <FaImage />
      </FixedButtonWithPopper>
      <FixedButtonWithPopper
        position={{ bottom: 10, right: 10 }}
        poppedChildren={<WidgetSelector />}>
        <FiPlus />
      </FixedButtonWithPopper>
      <Background
        color={backgroundType === 'color' ? color : 'unset'}
        image={backgroundType === 'image' ? imageUrl : ''}
      />
    </main>
  );
};

export default NewTab;

const Background = styled.div<{
  color: string;
  image: string;
}>`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: -100;
  background-color: ${props => props.color};
  background-image: url(${props => props.image});
  background-size: cover;
`;
