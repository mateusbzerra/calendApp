import React, { useState, useCallback, FormEvent, useEffect } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { useToasts } from 'react-toast-notifications';
import { useCalendar } from '../../hooks/calendar';
import * as S from './styles';

interface ReminderFormProps {
  handleCloseModal(): void;
  reminderId?: string;
}

const ReminderForm: React.FC<ReminderFormProps> = ({
  reminderId,
  handleCloseModal,
}) => {
  const { addToast } = useToasts();
  const {
    getReminder,
    availableColors,
    addReminder,
    updateReminder,
    removeReminder,
  } = useCalendar();
  const [selectedColor, setSelectedColor] = useState('');
  const [title, setTitle] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState<string>();
  const [minutes, setMinutes] = useState<string>();
  const [city, setCity] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (reminderId) {
      const reminder = getReminder(reminderId);
      if (!reminder) return;
      setTitle(reminder.title);
      setDate(new Date(reminder.datetime));
      setCity(reminder.city);
      setHour(new Date(reminder.datetime).getHours().toString());
      setMinutes(new Date(reminder.datetime).getMinutes().toString());
      setSelectedColor(reminder.color);
    }
  }, [reminderId, getReminder]);

  const handleDeleteReminder = useCallback(() => {
    if (!reminderId) return;
    removeReminder(reminderId);
    addToast('Reminder successfully deleted', {
      autoDismiss: false,
      appearance: 'success',
    });
    if (handleCloseModal) handleCloseModal();
  }, [addToast, removeReminder, handleCloseModal, reminderId]);

  const handleNewReminder = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!title || title.length > 30) {
        setErrorMessage('Title field is required');
        return;
      }
      if (title.length > 30) {
        setErrorMessage('is bigger than 30 characters');
        return;
      }
      if (!date) {
        setErrorMessage('Date field is required');
        return;
      }
      if (!hour || !minutes) {
        setErrorMessage('Time fields are required');
        return;
      }
      if (!city) {
        setErrorMessage('City field is required');
        return;
      }
      if (!selectedColor) {
        setErrorMessage('Color field is required');
        return;
      }

      const formattedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        Number(hour),
        Number(minutes)
      );
      if (!reminderId) {
        addReminder({
          title,
          datetime: formattedDate,
          city,
          color: selectedColor,
        });
        addToast('Reminder successfully created', {
          appearance: 'success',
          autoDismiss: true,
        });
        handleCloseModal();
        return;
      }

      updateReminder({
        id: reminderId,
        title,
        datetime: formattedDate,
        city,
        color: selectedColor,
      });
      addToast('Reminder updated successfully', {
        appearance: 'success',
        autoDismiss: true,
      });

      handleCloseModal();
    },
    [
      title,
      date,
      city,
      selectedColor,
      hour,
      minutes,
      reminderId,
      addReminder,
      updateReminder,
      handleCloseModal,
      addToast,
    ]
  );

  return (
    <S.Container>
      <form onSubmit={handleNewReminder} data-testid="reminder-form">
        <S.InputGroup>
          <p>Title</p>
          <input
            data-testid="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            maxLength={30}
            placeholder="Ex: Jobsity Interview"
          />
        </S.InputGroup>
        <S.InputGroup>
          <p>Date</p>
          <DayPickerInput
            data-testid="dateInput"
            style={{ width: '100%' }}
            value={date}
            onDayChange={(selectedDate: Date) => setDate(selectedDate)}
          />
        </S.InputGroup>

        <S.InputDoubleGroup>
          <p>Hour</p>
          <input
            data-testid="hourInput"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            type="number"
            min="0"
            max="24"
            maxLength={2}
            placeholder="12"
          />

          <p>Minutes</p>
          <input
            data-testid="minutesInput"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            type="number"
            min="0"
            max="59"
            maxLength={2}
            placeholder="45"
          />
        </S.InputDoubleGroup>
        <S.InputGroup>
          <p>City</p>
          <input
            data-testid="cityInput"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Ex: San Francisco"
          />
        </S.InputGroup>
        <S.Colors>
          <p>Choose a color</p>
          {availableColors &&
            availableColors.map((color) => (
              <S.ColorButton
                data-testid={`color-${color}`}
                key={color}
                onClick={() => setSelectedColor(color)}
                isSelected={color === selectedColor}
                color={color}
                type="button"
              />
            ))}
        </S.Colors>
        {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
        <S.Buttons>
          <S.SubmitButton type="submit">Save</S.SubmitButton>
          {reminderId && (
            <S.DeleteButton onClick={handleDeleteReminder}>
              Delete
            </S.DeleteButton>
          )}
        </S.Buttons>
      </form>
    </S.Container>
  );
};

export default ReminderForm;
