import { useEffect, useReducer, useState } from "react";

// Components
import { Typography, Dropdown, Button, ConfirmButton } from "components/common";

// Styled Elements
import { EditStyles, NewEmployeeStyles } from "assets/styles/home/employees";

// Images
import ArrowRed from "assets/images/common/arrows/red-down.svg";
import ArrowWhite from "assets/images/common/arrows/white-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { oneEmployee } from "../Module";
import { Field } from "components/common/Field";
import moment from "moment-jalaali";
import DatePicker from "components/common/datePicker/month";

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "FirstName":
      return { ...state, FirstName: action.payload };
    case "LastName":
      return { ...state, LastName: action.payload };
    case "NationalCode":
      return { ...state, NationalCode: action.payload };
    case "Birthday":
      return { ...state, Birthday: action.payload };
    case "FatherName":
      return { ...state, FatherName: action.payload };
    case "Sex":
      return { ...state, Sex: action.payload };
    default:
      return state;
  }
};

export const PersonalInformationForm = ({
  currentPage,
  navigateAddress,
  onChangeStep,
}) => {
  // Hooks
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Token } = useSelector((state) => state.auth);

  // Destracturing information
  const { oneItem } = useSelector((state) => state.employees);
  useEffect(() => {
    dispatch(oneEmployee(Token, params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  // Reducer
  let m = moment(`${oneItem?.Birthday}`);
  useEffect(() => {
    formDispatch({
      type: "FirstName",
      payload: oneItem?.FirstName ? oneItem?.FirstName : "",
    });
    formDispatch({
      type: "LastName",
      payload: oneItem?.LastName ? oneItem?.LastName : "",
    });
    formDispatch({
      type: "NationalCode",
      payload: oneItem?.NationalCode ? oneItem?.NationalCode : "",
    });
    formDispatch({
      type: "Birthday",
      payload: oneItem?.Birthday ? m.format("jYYYY-jMM-jDD") : "",
    });
    formDispatch({
      type: "FatherName",
      payload: oneItem?.FatherName ? oneItem?.FatherName : "",
    });
    formDispatch({
      type: "Sex",
      payload: oneItem?.Sex.toString()
        ? oneItem?.Sex.toString() === "1"
          ? "مرد"
          : "زن"
        : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneItem]);
  const initialState = {
    FirstName: "",
    LastName: "",
    NationalCode: "",
    Birthday: "",
    FatherName: "",
    Sex: "",
  };
  const [formState, formDispatch] = useReducer(reducer, initialState);
  // State
  const [gender, setGender] = useState();
  useEffect(() => {
    if (oneItem?.Sex !== undefined) {
      if (oneItem?.Sex.toString() === "1") {
        setGender("مرد");
      } else {
        setGender("زن");
      }
    }
  }, [oneItem]);
  const [isEmpty, setIsEmpty] = useState(null);

  // Handlers
  const dateHandler = (event) => {
    formDispatch({ type: "Birthday", payload: event });
  };
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    formDispatch({ type: name, payload: value });
  };
  const setGenderHandler = (text) => {
    formDispatch({ type: "Sex", payload: text });
    setGender(text);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    let hasError;
    Object.entries(formState).forEach(([key, value]) => {
      if (value === null || value === "") {
        hasError = true;
        setIsEmpty({ type: key });
      }
    });
    if (hasError) return;
    setIsEmpty(null);
    onChangeStep("personalInformation", formState);
  };
  return (
    <form onSubmit={submitHandler}>
      <EditStyles.GridContainer>
        <EditStyles.FormGroup>
          <Typography weight="light">نام</Typography>
          <Field
            textAlign="center"
            type={"text"}
            placeHolder="نام کوچک خود را بنویسید"
            onInvalidMessage="لطفا نام کوچک خود را وارد کنید"
            required={true}
            onChange={inputChangeHandler}
            value={formState.FirstName}
            name="FirstName"
          />
        </EditStyles.FormGroup>
        <EditStyles.FormGroup>
          <Typography weight="light">نام خانوادگی</Typography>
          <Field
            textAlign="center"
            type={"text"}
            placeHolder="نام خانوادگی خود را بنویسید"
            onInvalidMessage="لطفا نام خانوادگی خود را وارد کنید"
            required={true}
            onChange={inputChangeHandler}
            value={formState.LastName}
            name="LastName"
          />
        </EditStyles.FormGroup>
        <EditStyles.FormGroup>
          <Typography weight="light">کد ملی</Typography>
          <NewEmployeeStyles.RemoveArrows>
            <Field
              textAlign="center"
              type={"number"}
              placeHolder="کد ملی خود را بنویسید"
              onInvalidMessage="لطفا کد ملی خود را وارد کنید"
              required={true}
              onChange={inputChangeHandler}
              value={formState.NationalCode}
              name="NationalCode"
            />
          </NewEmployeeStyles.RemoveArrows>
        </EditStyles.FormGroup>
        <EditStyles.UnChangedInput>
          <Typography weight="light">تاریخ تولد</Typography>
          <DatePicker
            placeHolder="لطفا تاریخ تولد خود را وارد کنید"
            onChange={dateHandler}
            value={formState.Birthday}
          />
        </EditStyles.UnChangedInput>
        <EditStyles.FormGroup>
          <Typography weight="light">نام پدر</Typography>
          <Field
            textAlign="center"
            type={"text"}
            placeHolder="نام پدر خود را بنویسید"
            onInvalidMessage="لطفا نام پدر خود را وارد کنید"
            required={true}
            onChange={inputChangeHandler}
            value={formState.FatherName}
            name="FatherName"
          />
        </EditStyles.FormGroup>
        <EditStyles.FormGroup>
          <Typography weight="light">جنسیت</Typography>
          <Dropdown
            firstData={gender}
            dropData={["مرد", "زن"]}
            imageSrc={ArrowRed}
            setSelectedState={setGenderHandler}
            color="red"
            width="100%"
          />
        </EditStyles.FormGroup>
      </EditStyles.GridContainer>
      {isEmpty && (
        <NewEmployeeStyles.ErrorMessage>
          لطفا {isEmpty.type === "Birthday" ? "تاریخ تولد" : "جنسیت"} خود را
          انتخاب کنید
        </NewEmployeeStyles.ErrorMessage>
      )}
      <EditStyles.ButtonContainer>
        <ConfirmButton
          onClick={() =>
            navigate(navigateAddress, { state: { currentPage: currentPage } })
          }
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
      </EditStyles.ButtonContainer>
    </form>
  );
};
