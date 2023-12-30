import { useState } from "react";
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

const PageOne = ({ setPage }) => {
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
    <LoginStyles.PageOneBody
      onClick={() => {
        setPage(2);
      }}
    >
      <LoginStyles.PageOneImage>
        <div>Image</div>
      </LoginStyles.PageOneImage>
      <LoginStyles.PageOneDetail>
        <div style={{ color: "#e67205", fontSize: "9vh", fontWeight: "400" }}>
          تیک‌من
        </div>
        <div style={{ color: "#183573", fontSize: "7vh", fontWeight: "300" }}>
          دستیار من
        </div>
      </LoginStyles.PageOneDetail>
    </LoginStyles.PageOneBody>
  );
};

export default PageOne;
