/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// Components
import { pagesStatusData } from "components/layout/subheader/Module";

// Styled Elements
import { SubheaderStyles } from "assets/styles/layout/subheader";
import { Menu } from "./Menu";

// Images
export const PageStatus = ({ title, icon, badge, path, setPath }) => {
  const location = useLocation();
  const [pageStatus, setPageStatus] = useState();
  const statusSetHandler = (name) =>
    setPageStatus(pagesStatusData.find((s) => s.name === name));
  useEffect(() => {
    // if (location.pathname.includes("/")) {
    statusSetHandler("employees-list");
    // }
  }, [location.pathname]);

  const [openModal, setOpenModal] = useState(false);
  const openMenu = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Menu openModal={openModal} setOpenModal={setOpenModal} />
      <SubheaderStyles.PageStatus onClick={openMenu} type={pageStatus?.type}>
        {/* <SubheaderStyles.Typography
          type={pageStatus?.type}
          size="base"
          weight="medium"
        >
          {pageStatus?.title}
        </SubheaderStyles.Typography> */}
        <div>
          <img src={pageStatus?.icon} alt="icon" />
          {pageStatus?.badge !== "" && (
            <SubheaderStyles.PageStatusBadge
              fromTop={pageStatus?.fromTop}
              src={pageStatus?.badge}
            />
          )}
        </div>
      </SubheaderStyles.PageStatus>
    </>
  );
};

PageStatus.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  badge: PropTypes.node,
};
