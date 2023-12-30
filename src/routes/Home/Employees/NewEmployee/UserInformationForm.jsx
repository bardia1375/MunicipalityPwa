import { useReducer, useState } from "react";

// Components
import { Typography, Button } from "components/common";

// Styled Elements
import { NewEmployeeStyles } from "assets/styles/home/employees";

// Images
import EyeRed from "assets/images/common/eye/red.svg";
import ArrowWhite from "assets/images/common/arrows/white-left.svg";
import { Field } from "components/common/Field";

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "employeeId":
      return { ...state, employeeId: action.payload };
    case "identificationNumber":
      return { ...state, identificationNumber: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "email":
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export const UserInformationForm = ({ dataShow, onChangeStep, setStep }) => {
  const initialState = {
    employeeId: dataShow.employeeId ? dataShow.employeeId : "",
    identificationNumber: dataShow.identificationNumber
      ? dataShow.identificationNumber
      : "",
    password: dataShow.password ? dataShow.password : "",
    email: dataShow.email ? dataShow.email : "",
  };
  // Reducer
  const [formState, formDispatch] = useReducer(reducer, initialState);
  const [isEmpty, setIsEmpty] = useState(null);
  // Handlers
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    formDispatch({ type: name, payload: value });
  };
  function checkPassWord(code) {
    var L = code.length;
    return L > 5;
  }
  const submitHandler = (event) => {
    event.preventDefault();
    let hasError;
    Object.entries(formState).forEach(([key, value]) => {
      // if (value === null || value === "" || /^\s*$/.test(value)) {

      // }
      if (key === "password") {
        if (!checkPassWord(value)) {
          setIsEmpty("حداقل کاراکتر مجاز 6 حرف می‌باشد!");
          hasError = true;
        }
      }
    });
    // Object.entries(formState).forEach(([key, value]) => {
    //   if (/^\s*$/.test(value)) hasError = true;
    // });
    if (hasError) return;
    onChangeStep("userInformation", formState);
  };

  return (
    <form onSubmit={submitHandler}>
      <NewEmployeeStyles.GridContainer>
        <NewEmployeeStyles.FormGroup>
          <Typography weight="light">شماره کارمندی</Typography>
          <NewEmployeeStyles.RemoveArrows>
            <Field
              textAlign="center"
              type={"number"}
              onInvalidMessage="لطفا شماره کارمندی خود را وارد کنید"
              required={true}
              placeHolder="به عدد بنویسید"
              onChange={inputChangeHandler}
              value={formState.employeeId}
              name="employeeId"
            />
          </NewEmployeeStyles.RemoveArrows>
        </NewEmployeeStyles.FormGroup>
        <NewEmployeeStyles.FormGroup>
          <Typography weight="light">کد شناسایی</Typography>
          <NewEmployeeStyles.RemoveArrows>
            <Field
              textAlign="center"
              type={"number"}
              onInvalidMessage="لطفا کد شناسایی خود را وارد کنید"
              required={true}
              placeHolder="به عدد بنویسید"
              onChange={inputChangeHandler}
              value={formState.identificationNumber}
              name="identificationNumber"
            />
          </NewEmployeeStyles.RemoveArrows>
        </NewEmployeeStyles.FormGroup>
        <NewEmployeeStyles.FormGroupWithIcon>
          <Typography weight="light">رمز عبور</Typography>
          <div>
            <img src={EyeRed} alt="EyeRed" />
            <input
              type="password"
              placeholder="ترکیبی از اعداد و حروف بنویسید"
              onChange={inputChangeHandler}
              value={formState.password}
              name="password"
              onInvalid={(e) =>
                e.target.setCustomValidity("لطفا رمز خود را وارد نمایید")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              required={true}
            />
          </div>
        </NewEmployeeStyles.FormGroupWithIcon>
        <NewEmployeeStyles.FormGroup>
          <Typography weight="light">ایمیل</Typography>
          <Field
            textAlign="center"
            type="email"
            placeHolder="ایمیل خود را بنویسید"
            onChange={inputChangeHandler}
            value={formState.email}
            name="email"
            onInvalidMessage="ایمیل معتبر نمی‌باشد!"
            // required={true}
          />
        </NewEmployeeStyles.FormGroup>
      </NewEmployeeStyles.GridContainer>
      {isEmpty && (
        <NewEmployeeStyles.ErrorMessage>
          {isEmpty}
        </NewEmployeeStyles.ErrorMessage>
      )}
      <NewEmployeeStyles.ButtonContainer>
        <Button
          onClick={() => setStep((prevStep) => prevStep - 1)}
          variant="linear"
          display="flex"
          align="center"
          height={"27px"}
          gap="20px"
          padding="2px 20px"
          color="white"
          bg="linear-gradient(90deg, #ff8080 0%, #ffd011 100%)"
          hoverType="colorChange"
          hoverBg="linear-gradient(90deg, #fc2b2b 0%, #ffcd00 100%)"
        >
          <img
            style={{ transform: "rotate(180deg)" }}
            src={ArrowWhite}
            alt="ArrowWhite"
          />
          <Typography>مرحله قبل</Typography>
        </Button>
        <Button
          variant="linear"
          display="flex"
          align="center"
          height={"27px"}
          gap="20px"
          padding="2px 20px"
          color="white"
          bg="linear-gradient(90deg, #ff8080 0%, #ffd011 100%)"
          hoverType="colorChange"
          hoverBg="linear-gradient(90deg, #fc2b2b 0%, #ffcd00 100%)"
        >
          <Typography>مرحله بعد</Typography>
          <img src={ArrowWhite} alt="ArrowWhite" />
        </Button>
      </NewEmployeeStyles.ButtonContainer>
    </form>
  );
};
