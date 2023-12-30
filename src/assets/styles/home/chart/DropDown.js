import styled from "styled-components";
export const DropDownContainer = styled.div``;
export const DropDown = styled.div`
  border: 1px solid #ff4d4d;
  border-radius: 6px;
  font-size: 20px;
  color: #ff4d4d;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
      to right bottom,
      #c7c7c7 0%,
      #e5e5e5 41%,
      #f8f8f8 76%,
      #ffffff 100%
    )
    0% 0% no-repeat padding-box;
  transition: all 1s;
  width: 220px;
  margin-top: 2.5rem;
  height: ${({ isOpen }) => (isOpen ? "70px" : "35px")};
  overflow-y: hidden;
`;

export const DropDownItem = styled.span`
  border-bottom: 1px solid white;
  padding: 0 5px;
  font-weight: ${({ isSelected }) => (isSelected ? "600" : "300")};
`;
export const Arrow = styled.div`
  position: absolute;
  top: 15px;
  left: 5px;
  z-index: 1;
  &::after,
  &::before {
    position: relative;
    content: "";
    display: block;
    width: 20px;
    height: 2px;
    background: #ff4d4d;
    transition: 0.3s ease-in-out;
  }
  &::after {
    transform: ${({ isOpen }) => (isOpen ? "rotate(-45deg)" : "rotate(45deg)")};
    left: -1px;
    top: -1px;
  }

  &::before {
    left: 12px;
    top: 1px;
    transform: ${({ isOpen }) => (isOpen ? "rotate(45deg)" : "rotate(-45deg)")};
  }
`;
