import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getISODay,
  isToday,
  isSameDay,
  isSameMonth,
  set,
  format,
} from 'date-fns';
import enUS from 'date-fns/locale/en-US';

import { GrNext, GrPrevious } from 'react-icons/gr';
import * as S from './styles';
import { useCalendar } from '../../hooks/calendar';
import Modal from '../Modal';
import ReminderForm from '../ReminderForm';

const Calendar: React.FC = () => {
  const [today, setToday] = useState(new Date());
  const [selectedReminder, setSelectedReminder] = useState<string>(
    '1598150635501'
  );
  const [openModal, setOpenModal] = useState(false);

  const months = useMemo(
    () => [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    []
  );
  const weekDays = useMemo(
    () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    []
  );

  const firstDayISO = useMemo(() => getISODay(startOfMonth(today)), [today]);
  const lastDayOfPreviousMonth = useMemo(
    () => endOfMonth(new Date(today.getFullYear(), today.getMonth() - 1)),
    [today]
  );

  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

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
    endOfMonth(new Date(today.getFullYear(), today.getMonth()))
  );

  new Array(lastDayOfCurrentMonth === 7 ? 6 : 6 - lastDayOfCurrentMonth)
    .fill(0)
    .map((item, index) =>
      days.push(new Date(today.getFullYear(), today.getMonth() + 1, index + 1))
    );

  const handleSelectedReminder = useCallback((id: string) => {
    setSelectedReminder((oldId) => (id === oldId ? '' : id));
  }, []);
  const handleUpdateReminder = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleChangeMonth = useCallback((type: string) => {
    if (type !== 'NEXT') {
      setToday((oldState) => {
        const month = oldState.getMonth();
        if (month === 0) {
          return set(oldState, { month: 11 });
        }

        return set(oldState, { month: oldState.getMonth() - 1 });
      });
      return;
    }

    setToday((oldState) => {
      const month = oldState.getMonth();
      if (month === 11) {
        return set(oldState, { month: 0 });
      }
      return set(oldState, { month: oldState.getMonth() + 1 });
    });
  }, []);

  const { reminders } = useCalendar();

  return (
    <>
      <S.TableHeader>
        <button type="button" onClick={() => handleChangeMonth('PREVIOUS')}>
          <GrPrevious size="3rem" />
        </button>
        <h1>{months[today.getMonth()]}</h1>
        <button onClick={() => handleChangeMonth('NEXT')} type="button">
          <GrNext size="3rem" />
        </button>
        <h2>/{today.getFullYear()}</h2>
      </S.TableHeader>
      <S.Table>
        <S.ListOfWeekNames>
          {weekDays.map((weekName) => (
            <h3 key={weekName}> {weekName} </h3>
          ))}
        </S.ListOfWeekNames>
        <S.TableOfDays>
          {days.map((day: Date) => (
            <S.Day
              key={day.getTime()}
              isToday={isToday(day)}
              isSameMonth={isSameMonth(day, today)}
            >
              <div>
                {reminders
                  .filter((reminder) =>
                    isSameDay(new Date(reminder.datetime), day)
                  )
                  .map((item) => {
                    return (
                      <div key={item.id}>
                        <S.ReminderButton
                          type="button"
                          color={item.color}
                          onClick={() => handleSelectedReminder(item.id)}
                        >
                          {item.title}
                        </S.ReminderButton>
                        <S.Tooltip
                          isOpen={selectedReminder === item.id}
                          color={item.color}
                        >
                          <div>
                            <h3>{item.title}</h3>
                            <p>
                              {format(
                                new Date(item.datetime),
                                "EEEE',' MMMM', 'dd', ' yyyy 'at' HH:mm'h'",
                                { locale: enUS }
                              )}
                            </p>
                            <p>{item.city}</p>
                            <button
                              type="button"
                              onClick={handleUpdateReminder}
                            >
                              Edit
                            </button>
                          </div>
                        </S.Tooltip>
                      </div>
                    );
                  })}
              </div>
              <span>{day.getDate()}</span>
            </S.Day>
          ))}
        </S.TableOfDays>
      </S.Table>

      <Modal
        title="Edit Reminder"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ReminderForm
          reminderId={selectedReminder}
          handleCloseModal={() => setOpenModal(false)}
        />
      </Modal>
    </>
  );
};

export default Calendar;
