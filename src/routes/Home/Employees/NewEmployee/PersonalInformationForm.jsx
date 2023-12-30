/* eslint-disable eqeqeq */
import { useReducer, useState } from "react";

// Components
import { Typography, Dropdown, Button, ConfirmButton } from "components/common";

// Styled Elements
import { NewEmployeeStyles } from "assets/styles/home/employees";

// Images
import ArrowRed from "assets/images/common/arrows/red-down.svg";
import ArrowWhite from "assets/images/common/arrows/white-left.svg";
import { Field } from "components/common/Field";
import { useNavigate } from "react-router-dom";
import DatePicker from "components/common/datePicker/month";

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "firstName":
      return { ...state, firstName: action.payload };
    case "lastName":
      return { ...state, lastName: action.payload };
    case "nationalCode":
      return { ...state, nationalCode: action.payload };
    case "birthDate":
      return { ...state, birthDate: action.payload };
    case "fatherName":
      return { ...state, fatherName: action.payload };
    case "gender":
      return { ...state, gender: action.payload };
    default:
      return state;
  }
};

export const PersonalInformationForm = ({ onChangeStep, dataShow }) => {
  const initialState = {
    firstName: dataShow.firstName ? dataShow.firstName : "",
    lastName: dataShow.lastName ? dataShow.lastName : "",
    nationalCode: dataShow.nationalCode ? dataShow.nationalCode : "",
    birthDate: dataShow.birthDate ? dataShow.birthDate : "",
    fatherName: dataShow.fatherName ? dataShow.fatherName : "",
    gender: dataShow.gender ? dataShow.gender : null,
  };
  // Reducer
  const [formState, formDispatch] = useReducer(reducer, initialState);

  // State
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [gender, setGender] = useState(null);
  const [isEmpty, setIsEmpty] = useState(null);

  // Handlers
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    formDispatch({ type: name, payload: value });
  };
  const dateHandler = (event) => {
    formDispatch({ type: "birthDate", payload: event });
  };
  const setGenderHandler = (text) => {
    formDispatch({ type: "gender", payload: text });
    setGender(text);
  };
  function checkCodeMeli(code) {
    var L = code.length;

    if (L < 8 || parseInt(code, 10) == 0) return false;
    code = ("0000" + code).substr(L + 4 - 10);
    if (parseInt(code.substr(3, 6), 10) == 0) return false;
    var c = parseInt(code.substr(9, 1), 10);
    var s = 0;
    for (var i = 0; i < 9; i++) s += parseInt(code.substr(i, 1), 10) * (10 - i);
    s = s % 11;
    return (s < 2 && c == s) || (s >= 2 && c == 11 - s);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    let hasError;
    Object.entries(formState).forEach(([key, value]) => {
      if (key === "nationalCode") {
        if (!checkCodeMeli(value)) {
          setIsEmpty("کد ملی نامعتبر می‌باشد!");
          hasError = true;
        }
      }
      if (value === null || value === "" || /^\s*$/.test(value)) {
        if (key === "gender") {
          setIsEmpty("لطفا جنسیت خود را انتخاب کنید!");
          hasError = true;
        }
      }
    });
    if (hasError) return;
    setIsEmpty(null);
    onChangeStep("personalInformation", formState);
  };
  return (
    <form onSubmit={submitHandler}>
      <NewEmployeeStyles.GridContainer>
        <NewEmployeeStyles.FormGroup>
          <Typography weight="light">نام</Typography>
          <Field
            textAlign="center"
            type={"text"}
            placeHolder="نام کوچک خود را بنویسید"
            onInvalidMessage="لطفا نام کوچک خود را وارد کنید"
            required={true}
            onChange={inputChangeHandler}
            value={formState.firstName}
            name="firstName"
          />
        </NewEmployeeStyles.FormGroup>
        <NewEmployeeStyles.FormGroup>
          <Typography weight="light">نام خانوادگی</Typography>
          <Field
            textAlign="center"
            type={"text"}
            placeHolder="نام خانوادگی خود را بنویسید"
            onChange={inputChangeHandler}
            onInvalidMessage="لطفا نام خانوادگی خود را وارد کنید"
            required={true}
            value={formState.lastName}
            name="lastName"
          />
        </NewEmployeeStyles.FormGroup>
        <NewEmployeeStyles.FormGroup>
          <Typography weight="light">کد ملی</Typography>
          <NewEmployeeStyles.RemoveArrows>
            <Field
              textAlign="center"
              type={"number"}
              placeHolder="کد ملی خود را بنویسید"
              onInvalidMessage="لطفا کد ملی خود را وارد کنید"
              required={true}
              onChange={inputChangeHandler}
              value={formState.nationalCode}
              name="nationalCode"
            />
          </NewEmployeeStyles.RemoveArrows>
        </NewEmployeeStyles.FormGroup>
        <NewEmployeeStyles.FormGroup>
          <Typography weight="light">تاریخ تولد</Typography>
          <DatePicker
            placeHolder="لطفا تاریخ تولد خود را وارد کنید"
            onChange={dateHandler}
            value={dataShow.birthDate}
          />
        </NewEmployeeStyles.FormGroup>
        <NewEmployeeStyles.FormGroup>
          <Typography weight="light">نام پدر</Typography>
          <Field
            textAlign="center"
            type={"text"}
            placeHolder="نام پدر خود را بنویسید"
            onInvalidMessage="لطفا نام پدر خود را وارد کنید"
            required={true}
            onChange={inputChangeHandler}
            value={formState.fatherName}
            name="fatherName"
          />
        </NewEmployeeStyles.FormGroup>
        <NewEmployeeStyles.FormGroup>
          <Typography weight="light">جنسیت</Typography>
          <Dropdown
            firstData={dataShow.gender ? dataShow.gender : "انتخاب کنید"}
            dropData={["مرد", "زن"]}
            imageSrc={ArrowRed}
            setSelectedState={setGenderHandler}
            color="red"
            width="100%"
          />
        </NewEmployeeStyles.FormGroup>
      </NewEmployeeStyles.GridContainer>
      {isEmpty && (
        <NewEmployeeStyles.ErrorMessage>
          {isEmpty}
        </NewEmployeeStyles.ErrorMessage>
      )}
      <NewEmployeeStyles.ButtonContainer>
        <ConfirmButton
          onClick={() => navigate("/employees/list")}
          variant="bordered"
          color="orange"
        >
          <Typography>لغو</Typography>
        </ConfirmButton>
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
