import React from 'react';
import styled from 'styled-components';

interface Props {
  customColorTheme: string;
}
const BaseButton = styled.button<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 2rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  border: none;
  text-transform: uppercase;
  background-color: ${props => (props.disabled ? '#EEEEEE' : props.customColorTheme)};
  color: ${props => (props.disabled ? '#76767680' : 'white')};
  margin: 0 auto;
  margin-top: 1rem;
  font-family: $fira-sans;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  svg {
    margin-right: 0.5rem;
  }
`;

export default React.memo(BaseButton);
