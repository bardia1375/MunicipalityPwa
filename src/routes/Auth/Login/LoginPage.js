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
import { Link } from "react-router-dom";

const LoginPage = ({ setPage }) => {
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
    <LoginStyles.LoginPageBody>
      <LoginStyles.Header>
        <img src={Tikport} alt="Tikport" />
      </LoginStyles.Header>
      <form onSubmit={submitHandler}>
        <LoginStyles.LoginTitle hasBorder="true">
          اجازۀ ورود به تیک‌من
          <LoginStyles.Spacer
            style={{ marginBottom: "20px" }}
            hasBorder="true"
          />
        </LoginStyles.LoginTitle>

        <LoginStyles.InputGroup style={{ marginBottom: "20px" }}>
          <img src={Avatar} alt="Avatar" />
          <input
            type="text"
            placeholder="شمارۀ همراه خود را وارد کنید"
            name="employeeId"
            value={employeeId.value}
            required
            onInvalid={(e) =>
              e.target.setCustomValidity("لطفا شماره تلفن خود را وارد نمایید")
            }
            onInput={(e) => e.target.setCustomValidity("")}
            onChange={employeeIdChangeHandler}
          />
        </LoginStyles.InputGroup>
        {/* <LoginStyles.InputGroup>
          <img src={Eye} alt="Eye" />
          <input
            type="password"
            placeholder="رمز عبور خود را وارد کنید"
            name="password"
            value={password.value}
            onChange={passwordChangeHandler}
          />
        </LoginStyles.InputGroup> */}
        <LoginStyles.Actions>
          {/* <Link to="/password/reset"> */}
          <Typography size="lg" weight="light">
            کد فعال‌سازی به این شماره ارسال می‌شود.
          </Typography>
          {/* </Link> */}
          <ToastContainer />
        </LoginStyles.Actions>
        <LoginStyles.LoginButton>
          {userLoginLoading && <ButtonLoding />}

          <Typography size="lg">ثبت</Typography>
        </LoginStyles.LoginButton>
      </form>
    </LoginStyles.LoginPageBody>
  );
};

export default LoginPage;
