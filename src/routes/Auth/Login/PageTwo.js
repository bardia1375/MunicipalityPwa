import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Services
import { INITIAL_VALUE, validate } from "services/input-initial";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux
import { userLogin } from "../Module";

// Components
import { LoginLayout } from "components/layout";
import { Typography } from "components/common";

// Styled Elements
import { LoginStyles } from "assets/styles/auth";

import Tikport from "assets/images/auth/tikport-fa.svg";
import Avatar from "assets/images/auth/avatar.svg";
import Eye from "assets/images/auth/eye-orange.svg";
import { ButtonLoding } from "./../../../components/common/ButtonLoding";

const PageTwo = ({ setPage }) => {
  const dispatch = useDispatch();
  // States

  const [employeeId, setEmployeeId] = useState({ ...INITIAL_VALUE });
  const [password, setPassword] = useState({ ...INITIAL_VALUE });

  const employeeIdChangeHandler = (event) => setEmployeeId(validate(event));
  const passwordChangeHandler = (event) => setPassword(validate(event));
  const { userLoginLoading } = useSelector((state) => state.auth);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!employeeId.isValid || !password.isValid) return;

    const user = new FormData();
    user.append("UserName", employeeId.value);
    user.append("PassWord", password.value);

    dispatch(userLogin(user));
    // dispatch(setAuthentication(true))
    // navigate("/")
  };

  return (
    <LoginStyles.PageTwoBody>
      <LoginStyles.PageTwoDetail>
        <div style={{ color: "#e67205", fontSize: "7vh", fontWeight: "400" }}>
          سلام!
        </div>
        <div
          style={{
            color: "#183573",
            fontSize: "4vh",
            fontWeight: "300",
            textAlign: "center",
            padding: "6vw",
          }}
        >
          من دستیار شما هستم و از این پس به شما کمک می‌کنم تا به سادگی این کارها
          را انجام دهید
        </div>
      </LoginStyles.PageTwoDetail>
      <LoginStyles.PageTwoList style={{ whiteSpace: "nowrap" }}>
        <div>
          <div
            style={{
              color: "#183573",
              fontSize: "3vh",
              fontWeight: "600",
              padding: "5px",
            }}
          >
            ثبت تردد
          </div>
          <div
            style={{
              color: "#183573",
              fontSize: "3vh",
              fontWeight: "600",
              padding: "5px",
            }}
          >
            مدیریت کارها و برنامه‌ها
          </div>
          <div
            style={{
              color: "#183573",
              fontSize: "3vh",
              fontWeight: "600",
              padding: "5px",
            }}
          >
            محاسبۀ حقوق و مزایا
          </div>
          <div
            style={{
              color: "#183573",
              fontSize: "3vh",
              fontWeight: "600",
              padding: "5px",
            }}
          >
            ثبت مرخصی و مأموریت
          </div>
        </div>
      </LoginStyles.PageTwoList>
      <LoginStyles.PageOneImage>
        <div
          onClick={() => {
            setPage(3);
          }}
        >
          Image
        </div>
      </LoginStyles.PageOneImage>
      <LoginStyles.PageOneImage>
        <div>Image2</div>
      </LoginStyles.PageOneImage>
    </LoginStyles.PageTwoBody>
  );
};

export default PageTwo;
