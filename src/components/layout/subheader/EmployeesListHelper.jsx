import { useState } from "react";
import styled from "styled-components";

// Components
import { Typography, Dropdown } from "components/common";

// Images
import ArrowPrimaryDownBold from "assets/images/common/arrows/primary-down-bold.svg";
import ArrowSecondaryDown from "assets/images/common/arrows/secondary-down.svg";
import Magnifier from "assets/images/common/magnifier/primary.svg";
import { useEffect } from "react";
import moment from "moment-jalaali";

export const EmployeesListHelper = () => {
  const [isShowedFilters, setIsShowedFilters] = useState(false);

  const showFiltersToggleHandler = () =>
    setIsShowedFilters((prevState) => !prevState);

  const date = new Date();
  const [time, setTime] = useState("00:00:00");
  useEffect(() => {
    setTimeout(() => setTime(date.toLocaleTimeString("fa-IR")), 1000);
  }, [date.toLocaleTimeString("fa-IR")]);
  moment.loadPersian({ dialect: "persian-modern" });
  const day = moment().format("dddd");
  const dates = moment().format("jDD");
  const month = moment().format("jMMMM");
  const year = moment().format("jYYYY");

  return (
    <div
      style={{
        dispay: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "1400px",
      }}
    >
      <PageHeaderBody>
        <Info>
          <div style={{ fontSize: "2vh", fontWeight: "bold" }}>
            حمیدرضا نوری مطلق
          </div>
          <div style={{ fontSize: "1.4vh", fontWeight: "400" }}>
            شرکت گاز ایران | 79690090
          </div>
        </Info>
        <Slicer />
        <Clock>
          <div style={{ color: "#37b3b8", fontSize: "4vh" }}>{time}</div>
          <div
            style={{ fontSize: "1.5vh", fontWeight: "400", marginTop: "-10px" }}
          >
            {day} {dates} {month} {year}
          </div>
        </Clock>
      </PageHeaderBody>
    </div>
  );
};

const PageHeaderBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 0 20px;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  white-space: nowrap;
  text-align: left;
  min-height: 80px;
`;

const Clock = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  white-space: nowrap;
  text-align: left;
  min-height: 80px;
`;

const Slicer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  border-left: 2px solid #e3f3f6;
`;
