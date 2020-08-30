import React from 'react';
import Routes from './routes';
import CreateGlobalStyle from './styles/global';
import { CalendarProvider } from './hooks/calendar';
import 'react-day-picker/lib/style.css';
import { ToastProvider } from 'react-toast-notifications';

const App: React.FC = () => (
  <>
    <CalendarProvider>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </CalendarProvider>

    <CreateGlobalStyle />
  </>
);

export default App;
