import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Styled Elements
import { SubheaderStyles } from "assets/styles/layout/subheader";

// Components
import { EmployeesListHelper } from "./EmployeesListHelper";

export const PageHelperContainer = (props) => {
  const location = useLocation();

  const [changeIcons, setChangeIcons] = useState(false);
  const [pageName, setPageName] = useState(null);

  // useEffect(() => {
  //   if (
  //     location.pathname === "/employees/list" ||
  //     location.pathname === "/employees/deleted-list" ||
  //     location.pathname.includes("/")
  //   ) {
  //     setPageName("employees");
  //   } else setPageName(null);
  // }, [location.pathname]);

  // let leftSideElement;
  // switch (pageName) {
  //   case "employees":
  //     leftSideElement = <EmployeesListHelper />;
  //     break;
  //   default:
  //     leftSideElement = null;
  //     break;
  // }
  const onMouseOver = () => {
    setChangeIcons(true);
  };
  const onMouseLeave = () => {
    setChangeIcons(false);
  };
  return (
    <SubheaderStyles.PageHelperContainer
      pageName={pageName}
      onMouseOver={() => onMouseOver()}
      onMouseLeave={() => onMouseLeave()}
    >
      {/* {leftSideElement} */}
      <EmployeesListHelper />
    </SubheaderStyles.PageHelperContainer>
  );
};
