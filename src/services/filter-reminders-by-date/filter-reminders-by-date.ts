import { isSameDay } from 'date-fns';
import { Reminder } from '../../hooks/calendar';

interface Props {
  reminders: Reminder[];
  currentDate: Date;
}

export const filterRemindersByDate = ({ reminders, currentDate }: Props) => {
  return reminders.filter((reminder) =>
    isSameDay(new Date(reminder.datetime), currentDate)
  );
};
