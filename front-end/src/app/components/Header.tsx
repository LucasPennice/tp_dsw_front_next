import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  padding: 20px;
  background: #0070f3;
  color: white;
  text-align: center;
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <h1>Mi Proyecto Next.js con TypeScript</h1>
    </HeaderWrapper>
  );
};

export default Header;