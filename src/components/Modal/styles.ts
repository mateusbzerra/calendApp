import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
  z-index: 2;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 0.1rem solid #ddd;
`;

export const ModalContent = styled.div`
  background: #fff;
  width: 100%;
  height: auto;
  max-width: 60rem;
  padding: 3rem;
  box-shadow: 0px 1rem 2rem rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  position: relative;
  flex-direction: column;
  display: flex;
  margin: 0px 10px;
  @media screen and (max-width: 550px) {
    overflow: scroll;
    max-height: 70%;
  }
`;

export const Close = styled(MdClose)`
  font-size: 4rem;
  cursor: pointer;
  color: #666;
`;
