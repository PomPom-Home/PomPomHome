import { useState } from 'react';
import styled from 'styled-components';
import CloseButton from '../CloseButtonWithHover';

type ActionButtonProps = {
  position: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  poppedChildren: React.ReactNode;
};

const FixedButtonWithPopper = ({
  position,
  poppedChildren,
  children,
}: React.PropsWithChildren<ActionButtonProps>) => {
  const [isPopped, setIsPopped] = useState(false);

  const handleClick = () => setIsPopped(!isPopped);
  const handleClose = () => setIsPopped(false);

  return (
    <ButtonWrapper {...position}>
      <Button onClick={handleClick}>{children}</Button>
      {isPopped && (
        <Popper>
          <Wrapper>
            <Header>
              <CloseButton onClick={handleClose} width="20px" height="20px" />
            </Header>
            <Content>{poppedChildren}</Content>
          </Wrapper>
        </Popper>
      )}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div<{
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}>`
  position: fixed;
  top: ${props => (props.top !== undefined ? `${props.top}px` : 'auto')};
  bottom: ${props =>
    props.bottom !== undefined ? `${props.bottom}px` : 'auto'};
  left: ${props => (props.left !== undefined ? `${props.left}px` : 'auto')};
  right: ${props => (props.right !== undefined ? `${props.right}px` : 'auto')};
  z-index: 9999;
  background-color: transparent;
`;

const Button = styled.button`
  all: unset;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 3px 5px 10px -10px gray;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition:
    transform 0.2s,
    stroke-width 0.2s;
  &:hover {
    transform: scale(1.1); // 10% 크기 증가
    stroke-width: 5;
  }
`;

const Popper = styled.div`
  position: absolute;
  bottom: 100%;
  transform: translateX(calc(-100% + 40px));
  border-radius: 5px;
  padding: 8px;
  z-index: 0;
  background-color: transparent;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: ${props => props.theme.shadows.widget};
  background-color: transparent;
  backdrop-filter: blur(15px);
  overflow: hidden;
`;

const Header = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px;
`;

const Content = styled.div`
  padding: 10px;
`;

export default FixedButtonWithPopper;
