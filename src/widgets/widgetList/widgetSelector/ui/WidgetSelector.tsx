import { WIDGET_KEYS } from '@shared/model';
import {
  useWidgetLayer,
  useWidgetLayerAction,
} from '@shared/stores/backgroundWidgetLayerStore';
import { WIDGET_ICONS } from '@shared/ui/Icons';
import { getKeys } from '@shared/utils/utils';
import styled from 'styled-components';

const WidgetSelector = () => {
  const { updateWidgetVisible } = useWidgetLayerAction();
  const { visibleState } = useWidgetLayer();

  const widgetList = getKeys<typeof WIDGET_KEYS>(WIDGET_KEYS).sort();

  return (
    <Container count={widgetList.length}>
      {widgetList.map(widget => {
        return (
          <StyledButton
            disabled={visibleState[widget].isVisible}
            key={widget}
            onClick={() => updateWidgetVisible(widget, true)}>
            {WIDGET_ICONS[widget]}
          </StyledButton>
        );
      })}
    </Container>
  );
};

export default WidgetSelector;

const Container = styled.div<{ count: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${props => (props.count <= 4 ? props.count : 4)},
    1fr
  );
  gap: 10px;
`;

const StyledButton = styled.button`
  all: unset;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;

  &:disabled {
    cursor: default;
    opacity: 50%;
  }
`;
