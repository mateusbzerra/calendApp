import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import * as S from './styles';
import Calendar from '../../components/Calendar';
import Modal from '../../components/Modal';
import ReminderForm from '../../components/ReminderForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Home: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Header />
      <S.Content>
        <S.ContentHeader>
          <button onClick={() => setOpenModal(true)} type="button">
            <FiPlus size="3rem" />
            Add Reminder
          </button>
        </S.ContentHeader>

        <Calendar />
        <Modal
          title="Add new Reminder"
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <ReminderForm handleCloseModal={() => setOpenModal(false)} />
        </Modal>
      </S.Content>

      <Footer />
    </>
  );
};

export default Home;
