import styled, { css } from 'styled-components';

const Button = styled.button`
  background: ${({ theme }) => theme.primary};
  width: 220px;
  height: 47px;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;

  ${({ secondary }) =>
    secondary &&
    css`
      background: #e6e6e6;
      width: 105px;
      height: 30px;
      font-size: 10px;
    `}
`;

export default Button;
