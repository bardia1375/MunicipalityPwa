import styled from "styled-components";
import adminBg from "assets/images/chart.js/CardBg1.svg";

export const addManagementPlusContainer = styled.div`
  position: absolute;
  text-align: center;
  top: 100px;
  right: 50%;
  transform: translate(50%, 0px);
  width: 112px;
  height: 112px;
  background: url(${adminBg});
  background-repeat: no-repeat;
  background-size: cover;
`;
export const Img = styled.img`
  width: 70%;
  height: 70%;
  border-radius: 50%;
`;
export const dashed = styled.div`
  width: 100%;
  height: 100%;
  border: 4px dashed #ff4d4d;
  border-radius: 50%;
  transition: 0.5s;
`;

export const wrapper = styled.div`
  width: ${({ width }) => (width ? width + "px" : "105px")};
  height: ${({ height }) => (height ? height + "px" : "105px")};
  position: absolute;
  top: ${({ top }) => (top ? top : "3px")};
  left: ${({ left }) => (left ? left : "3px")};
  background: ${({ hasBg }) =>
    hasBg
      ? "transparent linear-gradient(135deg, #ffffff 0%, #fbfcfc 47%, #f1f3f5 84%, #ebeef0 100%)0% 0% no-repeat padding-box"
      : "unset"};
  box-shadow: ${({ hasBg }) => (hasBg ? " 0px 10px 12px #00000012" : "unset")};
  border-radius: 50%;
  padding: ${({ hasBg }) => (hasBg ? "10px" : "0")};
  transition: 0.5s;
  cursor: pointer;
  transform: ${({ open }) => (open ? "scale(2.5)" : "")};
  opacity: ${({ open }) => (open ? "0" : "1")};
  &:hover ${dashed} {
    transform: rotate(-45deg);
  }
  &:hover {
    transform: scale(1.1);
  }
`;
export const Plus = styled.div`
  &::after,
  &::before {
    position: absolute;
    content: "";
    display: block;
    width: 40px;
    height: 4px;
    background: #ff4d4d;
    transition: 0.3s ease-in-out;
    border-radius: 1rem;
  }
  &::after {
    right: 30%;
    top: 50%;
  }
  &::before {
    top: 50%;
    transform: rotate(90deg);
    right: 30%;
  }
`;
