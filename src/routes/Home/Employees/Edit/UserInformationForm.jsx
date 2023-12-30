import { useEffect, useReducer } from "react";

// Components
import { Typography, Button } from "components/common";

// Styled Elements
import { EditStyles, NewEmployeeStyles } from "assets/styles/home/employees";

// Images
import EyeRed from "assets/images/common/eye/red.svg";
import ArrowWhite from "assets/images/common/arrows/white-left.svg";
import { useSelector } from "react-redux";
import { Field } from "components/common/Field";

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "PersonnelId":
      return { ...state, PersonnelId: action.payload };
    case "IdentificationCode":
      return { ...state, IdentificationCode: action.payload };
    case "Password":
      return { ...state, Password: action.payload };
    case "Email":
      return { ...state, Email: action.payload };
    default:
      return state;
  }
};

export const UserInformationForm = ({ onChangeStep, setStep }) => {
  // Hooks
  const { oneItem } = useSelector((state) => state.employees);
  // Reducer
  useEffect(() => {
    formDispatch({
      type: "PersonnelId",
      payload: oneItem?.PersonnelId ? oneItem?.PersonnelId : "",
    });
    formDispatch({
      type: "IdentificationCode",
      payload: oneItem?.IdentificationCode ? oneItem?.IdentificationCode : "",
    });
    formDispatch({
      type: "Password",
      payload: null,
    });
    formDispatch({
      type: "Email",
      payload: oneItem?.User.Email ? oneItem?.User.Email : "",
    });
  }, [oneItem]);
  const initialState = {
    PersonnelId: "",
    IdentificationCode: "",
    Password: "",
    Email: "",
  };
  const [formState, formDispatch] = useReducer(reducer, initialState);
  // Handlers
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    formDispatch({ type: name, payload: value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    let hasError;
    Object.entries(formState).forEach(([key, value]) => {
      if (/^\s*$/.test(value)) hasError = true;
    });
    if (hasError) return;
    onChangeStep("userInformation", formState);
  };

  return (
    <form onSubmit={submitHandler}>
      <EditStyles.GridContainer>
        <EditStyles.FormGroup>
          <Typography weight="light">شماره کارمندی</Typography>
          <NewEmployeeStyles.RemoveArrows>
            <Field
              textAlign="center"
              type={"number"}
              placeFolder="به عدد بنویسید"
              onInvalidMessage="لطفا شماره کارمندی خود را وارد کنید"
              required={true}
              onChange={inputChangeHandler}
              value={formState.PersonnelId}
              name="PersonnelId"
            />
          </NewEmployeeStyles.RemoveArrows>
        </EditStyles.FormGroup>
        <EditStyles.FormGroup>
          <Typography weight="light">کد شناسایی</Typography>
          <NewEmployeeStyles.RemoveArrows>
            <Field
              textAlign="center"
              type={"number"}
              placeHolder="به عدد بنویسید"
              onInvalidMessage="لطفا کد شناسایی خود را وارد کنید"
              required={true}
              onChange={inputChangeHandler}
              value={formState.IdentificationCode}
              name="IdentificationCode"
            />
          </NewEmployeeStyles.RemoveArrows>
        </EditStyles.FormGroup>
        <EditStyles.FormGroupWithIcon>
          <Typography weight="light">رمز عبور</Typography>
          <div>
            <img src={EyeRed} alt="EyeRed" />
            <input
              type="password"
              placeholder="ترکیبی از اعداد و حروف بنویسید"
              onChange={inputChangeHandler}
              value={formState.Password ? formState.Password : "******"}
              name="Password"
              // required={true}
            />
          </div>
        </EditStyles.FormGroupWithIcon>
        <EditStyles.FormGroup>
          <Typography weight="light">ایمیل</Typography>
          <Field
            textAlign="center"
            type="email"
            placeHolder="ایمیل خود را بنویسید"
            onChange={inputChangeHandler}
            value={formState.Email}
            name="Email"
            required={true}
          />
        </EditStyles.FormGroup>
      </EditStyles.GridContainer>
      <EditStyles.ButtonContainer>
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
      </EditStyles.ButtonContainer>
    </form>
  );
};
