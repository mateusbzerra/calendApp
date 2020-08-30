import styled from 'styled-components';
import { lighten } from 'polished';

interface ContainerProps {
  isOpen: boolean;
}

interface ContentProps {
  color: string;
}

export const Container = styled.div<ContainerProps>`
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  position: absolute;

  width: 250px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;
export const Content = styled.div<ContentProps>`
  margin-top: 1rem;
  color: #fff;
  background: ${({ color }) => color};
  border-radius: 0.5rem;
  box-shadow: 0px 1rem 2rem rgba(0, 0, 0, 0.25);
  text-align: center;
  padding: 1rem;
  h3 {
    border-bottom: 0.1rem solid rgba(255, 255, 255, 0.5);
    margin-bottom: 0.5rem;
  }

  > p {
    font-weight: 200;
  }
  img {
    margin-top: -1rem;
    margin-bottom: -1rem;
  }
  > button {
    margin-top: 1rem;
    color: #fff;
    border: 0.2rem solid #fff;
    width: 100%;
    border-radius: 0.5rem;
    background: ${({ color }) => lighten('0.05', color)};
  }
`;
