import React from 'react';
import Routes from './routes';
import CreateGlobalStyle from './styles/global';
import { CalendarProvider } from './hooks/calendar';
import 'react-day-picker/lib/style.css';
// import { Container } from './styles';

const App: React.FC = () => (
  <>
    <CalendarProvider>
      <Routes />
    </CalendarProvider>

    <CreateGlobalStyle />
  </>
);

export default App;
