/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// Components
import { pagesStatusData } from "components/layout/subheader/Module";

// Styled Elements
import { SubheaderStyles } from "assets/styles/layout/subheader";
import { Modal } from "components/common";
import styled from "styled-components";

// Images
import Setting from "assets/images/header/setting.svg";
import Web from "assets/images/footer/web.png";
import Aparat from "assets/images/footer/aparat.png";
import Instagram from "assets/images/footer/instagram.png";
import Telegram from "assets/images/footer/telegram.png";
import Twitter from "assets/images/footer/twitter.png";
import JahanGostar from "assets/images/footer/jahangostar-logo.png";
import Power from "assets/images/header/power.svg";
import Refresh from "assets/images/header/refresh.svg";
import Avatar from "assets/images/header/user.png";
import Close from "assets/images/common/close/white-color-red-bg.svg";

export const Menu = ({ setOpenModal, openModal }) => {
  return (
    <>
      {openModal && (
        <Overlay
          onClick={() => setOpenModal(false)}
          // overlayWidth={overlayWidth}
          // overlayHeight={overlayHeight}
        ></Overlay>
      )}
      <Body openModal={openModal}>
        <div>
          <HeaderLine>
            <HeaderIcons>
              <img
                onClick={() => setOpenModal(false)}
                src={Close}
                alt="Close"
                width={32}
              />
              <Icons>
                <img
                  style={{
                    backgroundColor: "white",
                    borderRadius: "100%",
                    padding: "3px",
                  }}
                  width={31}
                  src={Setting}
                  alt="Setting"
                />
                <img src={Refresh} alt="Refresh" />
                <img src={Power} alt="Power" />
              </Icons>
            </HeaderIcons>
            <img
              src={Avatar}
              alt="UserImage"
              //   width={65}
              //   height={65}
              style={{
                padding: "2px",
                border: "2px solid #ff8080",
                borderRadius: "100%",
                marginLeft: "10px",
                width: "9vh",
                height: "9vh",
              }}
            />
          </HeaderLine>
          <InfoPerson>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignContent: "center",
                textAlign: "right",
                minWidth: "80%",
              }}
            >
              حمیدرضا نوری مطلق
              <div
                style={{
                  borderLeft: "1px solid white",
                  height: "15px",
                  margin: "0 10px",
                  marginTop: "2px",
                }}
              />
              طراح محصول
            </div>
          </InfoPerson>
          <InfoPlace>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignContent: "center",
                textAlign: "right",
                minWidth: "70%",
              }}
            >
              شرکت گاز ایران
              <div
                style={{
                  borderLeft: "1px solid grey",
                  height: "15px",
                  margin: "0 10px",
                  marginTop: "2px",
                }}
              />
              79690090
            </div>
          </InfoPlace>
        </div>
        <div>
          <MenuList>
            <Item>
              <img src={Setting} alt={"Setting"} /> ترددهای من
            </Item>
            <Item>
              <img src={Setting} alt={"Setting"} /> گزارش کار
            </Item>
            <Item>
              <img src={Setting} alt={"Setting"} /> شیفت‌های من
            </Item>
            <Item>
              <img src={Setting} alt={"Setting"} /> همکاران من
            </Item>
            <Item>
              <img src={Setting} alt={"Setting"} /> یادآوری کارها
            </Item>
            <Item>
              <img src={Setting} alt={"Setting"} /> تیکمنت
            </Item>
          </MenuList>
        </div>
        <Footer>
          <img src={Twitter} alt="Twitter" width={40} />
          <img src={Telegram} alt="Telegram" width={35} />
          <img src={Instagram} alt="Instagram" width={35} />
          <img src={Aparat} alt="Aparat" width={35} />
          <img src={Web} alt="Web" width={35} />
        </Footer>
      </Body>
    </>
  );
};

Menu.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  badge: PropTypes.node,
};

export const HeaderIcons = styled.div`
  width: 70%;
  padding-right: 10px;
  height: 8vh;
  /* margin-top: 30px; */
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  /* backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px); */
  border: 1px solid rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

export const Icons = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
`;

export const InfoPerson = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin: 20px 0 10px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  /* backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px); */
  border: 1px solid rgba(255, 255, 255, 1);
`;

export const InfoPlace = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: lightGrey;
  font-weight: light;
  font-size: 1.7vh;
`;

export const MenuList = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  color: white;
  padding: 5vh;
  gap: 3vh;
  font-weight: 300;
  font-size: 3vh;
`;

export const Item = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  align-items: center;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ overlayWidth }) => (overlayWidth ? overlayWidth : "100%")};
  height: ${({ overlayHeight }) => (overlayHeight ? overlayHeight : "100%")};
  background-color: #fff1;
  z-index: 2;
  backdrop-filter: blur(5px);
  transition: 300ms;
`;

export const Body = styled.div`
  height: 100%;
  width: 80%;
  background-color: #193774;
  position: fixed;
  top: ${({ top }) => (top ? top : "50%")};
  left: ${({ openModal }) => (openModal ? "60%" : "150%")};
  transform: translate(-50%, -50%);
  z-index: ${({ theme }) => theme.z.modal};
  transition: 500ms;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Footer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 3vw;
  padding: 16px;
`;
