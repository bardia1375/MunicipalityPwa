import styled, { css } from "styled-components";
import { GlobalStyles } from "assets/styles/global";

const grid6 = css`
  display: grid;
  grid-template-columns: 1fr repeat(5, 2fr);
`;

const alignmentStyle = css`
  & > * {
    text-align: center;
  }

  & > *:first-child,
  & > *:last-child {
    text-align: right;
  }
`;

export const Container = styled.div`
  ${GlobalStyles.container}
  position: relative;
  min-height: 500px;
  padding: 32px;
  border-radius: 32px;
  border: 1px solid ${({ theme }) => theme.color.borderGray};
  background: ${({ theme }) => theme.color.white};
  box-shadow: inset 0px -30px 99px #0000000a, 0px 8px 36px #a0bdc180;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const ListContainer = styled.div`
  padding: 24px;
  border-radius: 12px;
  background: linear-gradient(180deg, #f6f6f6 0%, #faf9f8 71%, #ffffff 100%);
`;

export const ListHeader = styled.div`
  ${grid6}
  ${alignmentStyle}
  align-items:center;
  padding: 10px 20px;
  border-radius: 12px;
  color: ${({ theme }) => theme.color.darkGray};
  background: ${({ theme }) => theme.color.white}; ;
`;

export const ListBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

export const ListItem = styled.div`
  ${grid6}
  ${alignmentStyle}
  z-index : ${({ isDeleteMode }) => (isDeleteMode ? "3" : "0")};
  border: ${({ statusObjStyle }) => statusObjStyle?.border};
  color: ${({ statusObjStyle }) => statusObjStyle?.color};
  background: ${({ statusObjStyle }) => statusObjStyle?.bg};
  box-shadow: ${({ statusObjStyle }) => statusObjStyle?.boxShadow};
  align-items: center;
  padding: 10px 20px;
  border-radius: 12px;
  & > div {
    display: flex;
    justify-content: space-between;
  }
`;

export const ListItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
  border: 1px solid #e4e4e4;
  border-radius: 18px;

  & > img {
    width: 21px;
    height: 21px;
    transition: 300ms;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

// Delete Modal
export const DeleteModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 70px;
  border-radius: 20px;
  border: 1px solid #cbcbcb;
  color: #ff8080;
  background-color: #fff;
  box-shadow: inset 0px -10px 30px #0000000d, 0px 12px 35px #a0bdc180;

  & > div {
    display: flex;
    gap: 20px;

    & > button {
      padding: 0 50px;
      border-radius: 20px;
      cursor: pointer;
    }

    & > button:first-child {
      border: 1px solid #ff8080;
      color: #ff8080;
      background: #fff;
    }
    & > button:last-child {
      border: 1px solid #fff;
      color: #fff;
      background: #ff8080;
      &:hover {
        background: #ff4d4d;
      }
    }
  }
`;
