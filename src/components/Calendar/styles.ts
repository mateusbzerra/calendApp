import styled, { css } from 'styled-components';
import { lighten } from 'polished';

interface DayProps {
  isToday: boolean;
  isSameMonth: boolean;
}

interface ReminderButtonProps {
  color: string;
  small: boolean;
}

interface ReminderButtonContainerProps {
  small: boolean;
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
  background: ${({ color }) =>
    `linear-gradient(90deg, ${color}, ${lighten('0.1', color)});`};
  width: ${({ small }) => (small ? '50%' : '100%')};
  font-size: ${({ small }) => (small ? '1rem' : '1.2rem')};
  color: #fff;
  padding: 1px 0px;
  margin: 0px;
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
  }
`;
