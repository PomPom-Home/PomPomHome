import styled from 'styled-components';

type SettingLayoutProps = {
  children: React.ReactNode;
  handleClose: () => void;
};

const SettingLayout: React.FC<SettingLayoutProps> = ({
  children,
  handleClose,
}) => {
  return (
    <Container>
      <Header>
        <XButton onClick={handleClose} />
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

export default SettingLayout;

// 자식 크기에 맞춰져야 하므로, Container에 따로 width, heignt 지정하면 안된다.
const Container = styled.div`
  border-radius: 5px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.setting};
  //background-color: white;
  backdrop-filter: blur(150px);
`;
const Header = styled.div`
  display: flex;

  align-items: center;
  justify-content: flex-end;

  width: 100%;
  height: 30px;
`;
const Content = styled.div`
  overflow: hidden;
  padding: 5px;
`;

const XButton = styled.div`
  width: 15px;
  height: 15px;
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 3px;
  border-radius: 50%;
  background-color: rgba(51, 51, 51, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(51, 51, 51, 0.5);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 1px;
    width: 9px;
    background-color: white;
    transform-origin: center;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;
