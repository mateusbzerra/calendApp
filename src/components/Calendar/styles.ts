import styled, { css } from 'styled-components';
import { lighten } from 'polished';

interface DayProps {
  isToday: boolean;
  isSameMonth: boolean;
}

interface ReminderButtonProps {
  color: string;
}

interface TooltipProps {
  isOpen: boolean;
}

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  button {
    margin: 0 1rem;
  }
  h1 {
    font-size: 5rem;
    margin-right: 1rem;
  }
`;
export const Table = styled.div`
  border: 0.1rem solid #eee;
  border-radius: 1rem;
`;
export const Day = styled.div<DayProps>`
  border-right: 0.1rem solid #eee;
  border-top: 0.1rem solid #eee;

  height: 13rem;
  position: relative;
  > div {
    margin-top: 4rem;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 3.5rem;
    height: 3.5rem;
    margin: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ isSameMonth }) => (isSameMonth ? '#666' : '#DCDEE1')};
    ${({ isToday }) =>
      isToday &&
      css`
        background-color: #f18f01;
        border-radius: 50%;
        color: #fff;
      `}
  }
`;

export const ReminderButton = styled.button<ReminderButtonProps>`
  /* background-color: ${({ color }) => color}; */
  background: ${({ color }) =>
    `linear-gradient(90deg, ${color}, ${lighten('0.2', color)});`};
  width: 100%;
  font-size: 1.2rem;
  color: #fff;
`;

export const TableOfDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
export const ListOfWeekNames = styled(TableOfDays)`
  h3 {
    text-align: right;
    font-size: 1.8rem;
    padding: 2rem 1rem;
    /* background-color: #006e90;
    color: #fff;
    text-align: center;
    padding: 1.5rem; */
  }
`;

export const Tooltip = styled.div<TooltipProps>`
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  position: absolute;

  width: 200px;
  height: 200px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  div {
    margin-top: 1rem;
    color: #222;
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0px 1rem 2rem rgba(0, 0, 0, 0.25);
  }
`;
