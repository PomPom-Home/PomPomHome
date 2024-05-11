import {
  useBackground,
  useBackgroundActions,
} from '@shared/stores/backgroundWidgetLayerStore';
import { MdRefresh } from 'react-icons/md';
import styled from 'styled-components';

const BackgroundSelector = () => {
  const { color, imageUrl: image } = useBackground();
  const { changeColor, changeType } = useBackgroundActions();

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeColor(event.target.value);
    changeType('color');
  };

  const handleImageClick = () => {
    changeType('image');
  };

  return (
    <Container>
      <Input type="color" value={color} onChange={handleColorChange} />
      <Button image={image} onClick={handleImageClick}>
        <MdRefresh size="20" />
      </Button>
    </Container>
  );
};

export default BackgroundSelector;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
`;

const Button = styled.button<{ image: string }>`
  all: unset;
  background-image: url(${props => props.image});
  width: 200px;
  height: 50px;
  background-size: cover;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 5px;
`;
