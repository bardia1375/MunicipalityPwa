// Components
import { ButtonContainer } from "assets/styles/layout/Calendar";
import { Button } from "components/common";
import { ButtonAction } from "components/layout/Footer";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ReqPic from "assets/images/common/button/new-req.svg";

export const Request = () => {
  window.history.replaceState({}, document.title);
  const location = useLocation();
  const [pageType, setPageType] = useState("Request");
  const [selectedTitle, setSelectedTitle] = useState("");

  return (
    <RequestBody>
      <RequestHeader>
        <TitleStyle
          onClick={() => {
            setSelectedTitle("درخواست‌های من");
          }}
          selected={selectedTitle === "درخواست‌های من"}
        >
          درخواست‌های من
        </TitleStyle>
        <TitleStyle
          selected={selectedTitle === "صندوق"}
          onClick={() => {
            setSelectedTitle("صندوق");
          }}
        >
          صندوق
        </TitleStyle>
      </RequestHeader>
      <NewRequest>
        <div style={{ width: "100%" }}>
          <CustomButton>
            <span style={{ fontSize: "3vh" }}>درخواست جدید</span>
            <img src={ReqPic} alt="" />
          </CustomButton>
        </div>
        <Status>
          <div>همه</div>
          <div>تأیید شده</div>
          <div>دردست‌بررسی</div>
        </Status>
        <ListOFRequests>List</ListOFRequests>
        <div>
          <ShowMore>نمایش بیشتر</ShowMore>
        </div>
      </NewRequest>
    </RequestBody>
  );
};

export const RequestBody = styled.div`
  height: 65vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TitleStyle = styled.div`
  color: ${({ selected }) => (selected ? "white" : "#37b3b8")};
  background-color: ${({ selected }) => (selected ? "#37b3b8" : "none")};
  padding: ${({ selected }) => (selected ? "10px 40px" : "10px")};
  border-radius: 30px;
  font-size: 2vh;
  font-weight: 400;
`;

export const RequestHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10vh;
  background-color: #ecfcfc;
  border-radius: 30px;
`;

export const NewRequest = styled.div`
  background-color: #ecfcfc;
  border-radius: 30px;
  padding: 20px 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const CustomButton = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6vh;
  border-radius: 30px;
  background-image: linear-gradient(to left, #ff8080, #ffb931);
  box-shadow: 0px 5px 20px -2px rgba(0, 0, 0, 0.3);
  position: relative;
  & > img {
    width: 15px;
    position: absolute;
    right: 20px;
  }
`;

export const Status = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  border: 1px solid red;
`;

export const ListOFRequests = styled.div``;

export const ShowMore = styled.div``;
