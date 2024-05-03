import styled from 'styled-components';
import { useRef } from 'react';
import useOutSideClick from '@shared/hooks/useOutsideClick';
import ModalPortal from '../ModalPortal';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
  const modalRef = useRef(null);

  const handleClose = () => {
    onClose();
  };

  useOutSideClick(modalRef, handleClose);

  return (
    <ModalPortal>
      <Overlay className="notDraggable">
        <ModalWrap ref={modalRef}>{children}</ModalWrap>
      </Overlay>
    </ModalPortal>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  max-width: 600px;
  height: fit-content;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
