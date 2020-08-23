import React from 'react';
import { FiHeart } from 'react-icons/fi';

import * as S from './styles';

const Footer: React.FC = () => (
  <S.Container>
    <p>
      Built with <FiHeart /> by Mateus Bezerra
    </p>
  </S.Container>
);

export default Footer;
