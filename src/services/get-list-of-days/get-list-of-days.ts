import {
  eachDayOfInterval,
  endOfMonth,
  getISODay,
  startOfMonth,
} from 'date-fns';

interface Props {
  currentDate: Date;
}

export const getListOfDays = ({ currentDate }: Props) => {
  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const firstDayISO = getISODay(startOfMonth(currentDate));
  const lastDayOfPreviousMonth = endOfMonth(
    new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
  );

  new Array(firstDayISO)
    .fill(0)
    .map((item, index) =>
      days.unshift(
        new Date(
          lastDayOfPreviousMonth.getFullYear(),
          lastDayOfPreviousMonth.getMonth(),
          lastDayOfPreviousMonth.getDate() - index
        )
      )
    );

  const lastDayOfCurrentMonth = getISODay(
    endOfMonth(new Date(currentDate.getFullYear(), currentDate.getMonth()))
  );

  new Array(lastDayOfCurrentMonth === 7 ? 6 : 6 - lastDayOfCurrentMonth)
    .fill(0)
    .map((item, index) =>
      days.push(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          index + 1
        )
      )
    );

  return days;
};
