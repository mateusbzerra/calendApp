import styled from 'styled-components';
import { shade } from 'polished';

export const Content = styled.div`
  background: #fcfcfe;
  width: 100%;
  max-width: 120rem;
  margin: -20rem auto 5rem auto;
  padding: 5rem;
  border-radius: 2rem;
  box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.4);
`;
export const ContentHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border: 0.2rem solid #99c24d;
    color: #99c24d;
    border-radius: 5px;
    height: 5rem;
    padding: 0 2rem;
    transition: all 0.5s;
    font-weight: bold;

    &:hover {
      svg {
        color: #fff;
      }
      background-color: #99c24d;
      color: #fff;
      box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);
    }
  }
`;
