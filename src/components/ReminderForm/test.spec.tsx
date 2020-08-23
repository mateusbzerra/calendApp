import React from 'react';
import { render, act } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';

import App from '../../App';

describe('ReminderForm', () => {
  it('should be able to add a new reminder', async () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(<App />);
    act(() => {
      fireEvent.click(getByText('Add Reminder'));
    });

    const titleInput = getByTestId('titleInput');
    const dateInput = getByPlaceholderText('YYYY-M-D');
    const hourInput = getByTestId('hourInput');
    const minutesInput = getByTestId('minutesInput');
    const cityInput = getByTestId('cityInput');

    await act(async () => {
      fireEvent.change(titleInput, {
        target: { value: 'Add new Reminder' },
      });
      fireEvent.change(dateInput, { target: { value: '2020-8-6' } });
      fireEvent.change(hourInput, { target: { value: '12' } });
      fireEvent.change(minutesInput, { target: { value: '15' } });
      fireEvent.change(cityInput, { target: { value: 'San Francisco' } });
      fireEvent.click(getByTestId('color-#4c4cff'));
    });

    await act(async () => {
      fireEvent.click(getByText('Save'));
    });

    expect(getByText('Reminder successfully created')).toBeTruthy();
  });
});
