// Components
// import { Typography, Spacer } from "components/common";

// Styled Elements
import { FooterStyles } from "assets/styles/layout";

// Images
import Web from "assets/images/footer/web.png";
import Aparat from "assets/images/footer/aparat.png";
import Instagram from "assets/images/footer/instagram.png";
import Telegram from "assets/images/footer/telegram.png";
import Twitter from "assets/images/footer/twitter.png";
import JahanGostar from "assets/images/footer/jahangostar-logo.png";
import styled from "styled-components";
import { useState } from "react";

export const Footer = () => {
  const [selected, setSelected] = useState("");
  return (
    <FooterStyles.AppbottomHead>
      <FooterStyles.Tikmentfooter>
        {/* <FooterStyles.Footericon src={Web} alt="web" />
        <FooterStyles.Footericon src={Aparat} alt="Aparat" /> */}
        {/* <ButtonAction> */}
        <FooterStyles.Home
          onClick={() => setSelected("Instagram")}
          selected={selected}
          src={Instagram}
          alt="Instagram"
        />
        {/* </ButtonAction> */}
        <Circle>
          <Arrow>↑</Arrow>
        </Circle>
        {/* <FooterStyles.Footericon src={Telegram} alt="Telegram" /> */}
        <FooterStyles.Messages
          onClick={() => setSelected("Twitter")}
          selected={selected}
          src={Twitter}
          alt="Twitter"
        />
      </FooterStyles.Tikmentfooter>
    </FooterStyles.AppbottomHead>
  );
};

export const Circle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #41b9c4;
  box-shadow: -1px 10px 20px -2px rgba(0, 0, 0, 0.3);
`;

export const Arrow = styled.div`
  color: white;
  font-size: 45px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ButtonAction = styled.div`
  /* width: 50px; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  /* width: 100px; */
  /* padding: 20px 50px 0 50px; */
  /* padding-left: 50px;
  padding-right: 50px; */
  margin-top: 20px;
  cursor: pointer;
  :hover {
    /* padding-left: 50px;
    padding-right: 50px; */
    background-color: red;
  }
`;
