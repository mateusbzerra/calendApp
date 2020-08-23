import React, { useEffect } from 'react';

import * as S from './styles';

interface ModalProps {
  title: string;
  open: boolean;
  onClose(): void;
}

const Modal: React.FC<ModalProps> = ({ title, open, onClose, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    });
  }, [onClose]);
  return (
    <>
      {open && (
        <S.Container>
          <S.ModalContent>
            <S.ModalHeader>
              <h1>{title}</h1>
              <S.Close onClick={onClose} />
            </S.ModalHeader>
            {children}
          </S.ModalContent>
        </S.Container>
      )}
    </>
  );
};

export default Modal;
