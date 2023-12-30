import styled from "styled-components";

import { Dropdown } from "components/common";

// Imgages
import ArrowPrimaryDownBold from "assets/images/common/arrows/primary-down-bold.svg";
import ArrowSecondaryDown from "assets/images/common/arrows/secondary-down.svg";
import Magnifier from "assets/images/common/magnifier/primary.svg";

export const CalendarHelper = () => {
  return (
    <Container>
      <Dropdown
        color={"primary"}
        title="وضعیت"
        firstData={"همه"}
        dropData={["همه", "فعال", "غیر فعال"]}
        imageSrc={ArrowPrimaryDownBold}
      />
      <Dropdown
        color={"secondary"}
        title="ترتیب بر اساس"
        firstData={"جدید ترین"}
        dropData={[
          "جدید ترین",
          "قدیمی ترین",
          "پرکاربرد ترین",
          "کم کاربرد ترین",
        ]}
        imageSrc={ArrowSecondaryDown}
      />
      <SearchBox>
        <input type="text" placeholder="جستجو کن" />
        <img src={Magnifier} alt="Magnifier" />
      </SearchBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 32%;
  height: 60px;

  input {
    flex: 1;
    padding: 5px 20px;
    border-radius: 25px;
    background-color: #fff;
  }

  img {
    position: absolute;
    top: 20px;
    left: 15px;
    width: 18px;
    height: 18px;
  }
`;
