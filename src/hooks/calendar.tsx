import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from 'react';

import orderBy from 'lodash/orderBy';

interface CalendarContextProps {
  reminders: Reminder[];
  availableColors: string[];
  addReminder(reminder: Omit<Reminder, 'id'>): void;
  getReminder(id: string): Reminder | undefined;
  updateReminder(reminder: Reminder): void;
  removeReminder(id: string): void;
}

export interface Reminder {
  id: string;
  title: string;
  datetime: Date;
  city: string;
  color: string;
}

const CalendarContext = createContext<CalendarContextProps>(
  {} as CalendarContextProps
);

const CalendarProvider: React.FC = ({ children }) => {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const storagedRepositories = localStorage.getItem('@CalendApp:reminders');
    if (storagedRepositories) {
      const data = JSON.parse(storagedRepositories).map(
        (reminder: Reminder) => ({
          ...reminder,
          datetime: new Date(reminder.datetime),
        })
      );

      return orderBy(data, 'datetime', 'asc');
    }
    return [];
  });
  const availableColors = useMemo(() => {
    return ['#4c4cff', '#601e9e', '#3d7b00', '#8f2323', '#e69500'];
  }, []);
  useEffect(() => {
    localStorage.setItem('@CalendApp:reminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = useCallback(
    ({ title, datetime, city, color }: Omit<Reminder, 'id'>) => {
      const id = Date.now().toString();

      const reminder = {
        id,
        title,
        datetime,
        city,
        color,
      };
      setReminders((oldState) => {
        const newState = [...oldState, { ...reminder }];
        return orderBy(newState, 'datetime', 'asc');
      });
    },
    []
  );

  const getReminder = useCallback(
    (id: string) => {
      const findReminder = reminders.find((reminder) => reminder.id === id);
      return findReminder;
    },
    [reminders]
  );

  const updateReminder = useCallback(
    ({ id, title, datetime, city, color }) => {
      const reminderIndex = reminders.findIndex(
        (reminder) => reminder.id === id
      );
      if (reminderIndex < 0) return;

      setReminders((oldState) =>
        oldState.map((reminder) => {
          if (reminder.id !== id) return reminder;
          const updatedReminder = {
            id: reminder.id,
            title,
            datetime,
            city,
            color,
          };
          return updatedReminder;
        })
      );
    },
    [reminders]
  );
  const removeReminder = useCallback((id: string) => {
    setReminders((oldState) =>
      oldState.filter((reminder) => reminder.id !== id)
    );
  }, []);
  return (
    <CalendarContext.Provider
      value={{
        reminders,
        availableColors,
        addReminder,
        getReminder,
        updateReminder,
        removeReminder,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

function useCalendar(): CalendarContextProps {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('useCalendar must be declared inside an CalendarProvider');
  }
  return context;
}

export { CalendarProvider, useCalendar };
