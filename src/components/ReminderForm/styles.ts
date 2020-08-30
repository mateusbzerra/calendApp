import styled from 'styled-components';

interface ColorButtonProps {
  color: string;
  isSelected: boolean;
}

export const Container = styled.div`
  height: 100%;
`;
export const InputGroup = styled.div`
  padding: 1rem 0;
  width: 100%;
  * {
    font-size: 2rem;
  }
  input {
    width: 100%;
    height: 5rem;
    border: 0.2rem solid #ddd;
    border-radius: 0.8rem;
    padding: 1rem;
  }
`;

export const InputDoubleGroup = styled.div`
  padding: 1rem 0;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  p {
    padding-right: 1rem;
  }

  input {
    margin-right: 2rem;
    font-size: 2rem;
    width: 10rem;
    height: 5rem;
    border: 0.2rem solid #ddd;
    border-radius: 0.8rem;
    padding: 1rem;
  }
`;

export const Colors = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem 0;
  font-size: 2rem;
  p {
    flex: 1;
  }
`;
export const ColorButton = styled.button<ColorButtonProps>`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-right: 10px;
  background-color: ${({ color }) => color};

  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.2)};
`;

export const ErrorMessage = styled.p`
  color: #b20000;
  padding: 2rem 0;
  text-align: center;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 0.3rem solid #99c24d;
  color: #99c24d;
  border-radius: 5px;
  height: 5rem;
  padding: 0 2rem;
  transition: all 0.5s;
  font-weight: bold;
  width: 100%;
  margin: 1rem;

  &:hover {
    svg {
      color: #fff;
    }
    background-color: #99c24d;
    color: #fff;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);
  }
`;

export const DeleteButton = styled(SubmitButton)`
  border: 0.3rem solid #b20000;
  color: #b20000;
  &:hover {
    svg {
      color: #fff;
    }
    background-color: #b20000;
  }
`;
