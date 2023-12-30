import styled, { css } from "styled-components";
import { GlobalStyles } from "assets/styles/global";

export const addManagement = styled.div`
  padding: 10px;
  border-radius: 15px;
  text-align: center;
  color: ${({ theme }) => theme.color.darkGray};
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0 4px 10px #eee;
`;
