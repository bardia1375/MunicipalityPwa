import styled, { css } from "styled-components";
// new manager card
export const CardBg = css`
  background: linear-gradient(
      to right bottom,
      #c7c7c7 0%,
      #e5e5e5 41%,
      #f8f8f8 76%,
      #ffffff 100%
    )
    0% 0% no-repeat padding-box;
  box-shadow: 2px 2px 2px #00000033;
  border: 4px solid #f3f3f3;
  border-radius: 24px;
  z-index: 2;
`;

export const MngContainer = styled.div`
  ${CardBg}
  border-radius: 10rem 10rem 2rem 2rem;
  padding-top: 30px;
  width: 269px;
`;
export const TraversalContainer = styled.div`
  ${CardBg}
  width: 100%;
  padding-top: 30px;
  position: relative;
  font-size: 20px;
  @media (min-width: 1300px) {
    font-size: 22px;
  }
  @media (min-width: 1600px) {
    font-size: 25px;
  }
`;
export const LongitudinalContainer = styled.div`
  ${CardBg}
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 21px;
  @media (min-width: 1300px) {
    font-size: 24px;
  }
  @media (min-width: 1600px) {
    font-size: 30px;
  }
  z-index: ${({ zindex }) => (zindex ? 4 : 2)};
  visibility: ${({ hideCard }) => (hideCard ? "hidden" : "visible")};
  &::before {
    position: absolute;
    content: " ";
    display: ${({ hideArrow }) => (hideArrow ? "none" : "block")};
    right: -82px;
    top: -15%;
    width: 90px;
    height: 70px;
    border-bottom: 2px
      ${({ theme, dashedArrow }) =>
        dashedArrow
          ? `dashed ${theme.color.red}`
          : `solid ${theme.color.brown}`};
    border-right: 2px
      ${({ theme, dashedArrow }) =>
        dashedArrow
          ? `dashed ${theme.color.red}`
          : `solid ${theme.color.brown}`};
    border-bottom-right-radius: 3rem;
  }
`;
export const ImgContainer = styled.div`
  text-align: center;

  box-shadow: 0px 20px 14px #8e9cbb54;
  width: 100px;
  height: 100px;

  @media (min-width: 1200px) {
    width: 110px;
    height: 110px;
  }
  @media (min-width: 1500px) {
    width: 125px;
    height: 125px;
  }
  border-radius: 50%;
  margin: 0 auto;

  margin-bottom: 5px;
  background: ${({ bgUrl }) => (bgUrl ? `url(${bgUrl})` : "red")};
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Img = styled.img`
  border-radius: 50%;
  width: 70%;
  height: 70%;
`;
export const LongitudinalImageWrapper = styled.div`
  width: 107px;
  height: 107px;
  background: transparent
    linear-gradient(315deg, #ffffff 0%, #fbfcfc 47%, #f1f3f5 84%, #ebeef0 100%)
    0% 0% no-repeat padding-box;
  box-shadow: 0px 10px 12px #00000012;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  right: -60px;
`;

export const LongitudinalPositionTitle = styled.div`
  background: ${({ isDeleting, theme }) =>
    isDeleting
      ? `${theme.color.lightRed}`
      : `transparent linear-gradient(260deg, #bf9685 0%, #966c5a 100%) 0%
0% no-repeat padding-box`};

  box-shadow: 0px 7px 15px #00000033;
  border-radius: 12px;
  position: absolute;
  top: -40px;
  right: 80px;
  min-width: 40%;
  padding: 5px 10px;
  color: #f5f5f5;
  text-align: center;
`;
const LInfo = css`
  border: 5px solid ${({ theme }) => theme.color.brown};
`;
const Lnew = css`
  border: 5px solid ${({ theme }) => theme.color.red};
`;
const LImageTypes = {
  new: Lnew,
  info: LInfo,
};
export const LongitudinalImage = styled.img`
  ${({ type }) => LImageTypes[type]}
  border-radius: 50%;
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  margin-bottom: 15px;
  max-width: 228px;
`;
export const LongitunalInputGroup = styled.div`
  display: flex;

  flex-direction: column;
  margin-bottom: 5px;
  width: calc(100% - 60px);
  max-width: 200px;
`;
export const Label = styled.label`
  color: ${({ theme }) => theme.color.red};
`;
export const Input = styled.input`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid ${({ theme }) => theme.color.red};
  border-radius: 6px;

  height: 22px;

  max-width: 200px;
  padding: 6px 10px;
  color: ${({ theme }) => theme.color.red};
`;
export const ButtonGroup = styled.div`
  display: ${({ hideButtons }) => (hideButtons ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  border: 1px solid #e4e4e4;
  width: max-content;
  border-radius: 1rem;
  padding: 4px 0;
  margin: 0 auto;
  margin-bottom: 1rem;
  align-self: flex-end;
`;
export const Button = styled.div`
  width: 25px;
  height: 25px;
  margin: 0 7px;
  cursor: pointer;
  transition: 0.5s;
  display: flex;

  &:hover {
    transform: scale(1.3);
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
