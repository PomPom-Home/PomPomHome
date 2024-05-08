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
`;

const Button = styled.button`
  position: relative;
  z-index: 1;
`;

const Popper = styled.div`
  position: absolute;
  bottom: 100%;
  transform: translateX(-50%);
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
  padding: 5px 3px;
`;

export default FixedButtonWithPopper;
