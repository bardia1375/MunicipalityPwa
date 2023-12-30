import { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";

// Redux
import {
  changeInformationMethodStatus,
  editEmployee,
  oneEmployee,
} from "routes/Home/Employees/Module";

// Components
import { TickItem } from "components/employees/TickItem";
import { Button, Typography, Dropdown, ConfirmButton } from "components/common";

// Styled Elements
import { EditStyles, NewEmployeeStyles } from "assets/styles/home/employees";

import { DetailStyles } from "assets/styles/home/employees";

// Images
import Tick from "assets/images/common/tick/white-color.svg";
import ArrowWhite from "assets/images/common/arrows/white-right.svg";
import ArrowRed from "assets/images/common/arrows/red-down.svg";
import { useEffect } from "react";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";
import { Field } from "components/common/Field";
import moment from "moment-jalaali";
import DatePicker from "components/common/datePicker/month";

// Reducer Functions
const personalReducer = (state, action) => {
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

const userReducer = (state, action) => {
  switch (action.type) {
    case "PersonnelId":
      return { ...state, PersonnelId: action.payload };
    case "IdentificationCode":
      return { ...state, IdentificationCode: action.payload };

    // case "Password":
    //   return { ...state, Password: action.payload };
    case "Email":
      return { ...state, Email: action.payload };
    default:
      return state;
  }
};

export const Employee = () => {
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { Token } = useSelector((state) => state.auth);

  // Destracturing information
  const { oneItem, loading } = useSelector((state) => state.employees);
  useEffect(() => {
    dispatch(oneEmployee(Token, params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  // Reducer
  let m = moment(`${oneItem?.Birthday}`);
  useEffect(() => {
    personalFormDispatch({
      type: "FirstName",
      payload: oneItem?.FirstName ? oneItem?.FirstName : "",
    });
    personalFormDispatch({
      type: "LastName",
      payload: oneItem?.LastName ? oneItem?.LastName : "",
    });
    personalFormDispatch({
      type: "NationalCode",
      payload: oneItem?.NationalCode ? oneItem?.NationalCode : "",
    });
    personalFormDispatch({
      type: "Birthday",
      payload: oneItem?.Birthday ? m.format("jYYYY-jMM-jDD") : "",
    });
    personalFormDispatch({
      type: "FatherName",
      payload: oneItem?.FatherName ? oneItem?.FatherName : "",
    });
    personalFormDispatch({
      type: "Sex",
      payload: oneItem?.Sex.toString()
        ? oneItem?.Sex.toString() === "1"
          ? "مرد"
          : "زن"
        : "",
    });
    userFormDispatch({
      type: "PersonnelId",
      payload: oneItem?.PersonnelId ? oneItem?.PersonnelId : "",
    });
    userFormDispatch({
      type: "IdentificationCode",
      payload: oneItem?.IdentificationCode ? oneItem?.IdentificationCode : "",
    });
    userFormDispatch({
      type: "Password",
      payload: "123456",
    });
    userFormDispatch({
      type: "Email",
      payload: oneItem?.User.Email ? oneItem?.User.Email : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneItem]);
  const personalInformation = {
    FirstName: "",
    LastName: "",
    NationalCode: "",
    Birthday: "",
    FatherName: "",
    Sex: "",
  };
  const [personalFormState, personalFormDispatch] = useReducer(
    personalReducer,
    personalInformation
  );
  const userInformation = {
    PersonnelId: "",
    IdentificationCode: "",
    Password: "",
    Email: "",
  };
  const [userFormState, userFormDispatch] = useReducer(
    userReducer,
    userInformation
  );

  // States
  const [bottomInfMode, setBottomInfMode] = useState("personalInformation");

  const [isEditMode, setIsEditMode] = useState(false);
  // eslint-disable-next-line no-unused-vars
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
  // Handlers
  const dateHandler = (event) => {
    personalFormDispatch({ type: "Birthday", payload: event });
  };
  const showPersonalInformationHandler = () =>
    setBottomInfMode("personalInformation");
  const showUserInformationHandler = () => setBottomInfMode("userInformation");
  const editModeEnableHandler = () => setIsEditMode(true);
  const editModeDisableHandler = () => setIsEditMode(false);
  const { state } = useLocation();
  const { currentPage, from } = state;
  const personalInputChangeHandler = (event) => {
    const { name, value } = event.target;
    personalFormDispatch({ type: name, payload: value });
  };
  const userInputChangeHandler = (event) => {
    const { name, value } = event.target;
    userFormDispatch({ type: name, payload: value });
  };
  const setGenderHandler = (text) => {
    personalFormDispatch({ type: "Sex", payload: text });
    setGender(text);
  };
  const confirmHandler = (event) => {
    const template = {
      ...oneItem,
      FirstName: personalFormState.FirstName,
      LastName: personalFormState.LastName,
      NationalCode: personalFormState.NationalCode,
      Birthday: moment(personalFormState.Birthday, "jYYYY-jMM-jDD").format(
        "YYYY-MM-DD"
      ),
      FatherName: personalFormState.FatherName,
      Sex: personalFormState.Sex === "مرد" ? "1" : "2",
      PersonnelId: userFormState.PersonnelId,
      IdentificationCode: userFormState.IdentificationCode,
      Email: userFormState.Email,
    };
    dispatch(editEmployee(Token, template));
    navigate(from);
    editModeDisableHandler();
  };

  // Redux
  const changeStatusHandler = (method) =>
    dispatch(changeInformationMethodStatus({ id: oneItem?.Unique, method }));

  // const backToListHandler = () => navigate("/employees/list");
  const backToListHandler = () =>
    navigate(from, { state: { currentPage: currentPage } });

  return (
    <DetailStyles.Container>
      <DetailStyles.ListHead>
        <Typography>نام کاربری</Typography>
        <Typography>شماره کارمندی</Typography>
        <Typography>سمت</Typography>
        <Typography>شیوه های اطلاع رسانی</Typography>
      </DetailStyles.ListHead>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <DetailStyles.TopSide>
            <DetailStyles.ListItem>
              <Typography>
                {oneItem?.FirstName + " " + oneItem?.LastName}
              </Typography>
              <Typography weight="light">{oneItem?.PersonnelId}</Typography>
              <Typography weight="light">{oneItem?.PositionName}</Typography>
              <div>
                <DetailStyles.TickContainer>
                  <TickItem
                    title="پیامک"
                    status={false}
                    // status={informationMethod?.withMessage}
                    onToggle={changeStatusHandler.bind(null, "withMessage")}
                  />
                  <TickItem
                    title="ایمیل"
                    status={false}
                    // status={informationMethod?.withEmail}
                    onToggle={changeStatusHandler.bind(null, "withEmail")}
                  />
                  <TickItem
                    title=" واتس اپ"
                    status={false}
                    // status={informationMethod?.withWhatsapp}
                    onToggle={changeStatusHandler.bind(null, "withWhatsapp")}
                  />
                </DetailStyles.TickContainer>
              </div>
            </DetailStyles.ListItem>
          </DetailStyles.TopSide>
          {/* Change Infomation Mode Buttons */}
          <DetailStyles.InformationModeButtonContainer>
            <DetailStyles.InformationModeButton>
              <Typography onClick={showPersonalInformationHandler}>
                اطلاعات فردی
              </Typography>
            </DetailStyles.InformationModeButton>
            <DetailStyles.InformationModeButton>
              <Typography onClick={showUserInformationHandler}>
                اطلاعات کارمندی
              </Typography>
            </DetailStyles.InformationModeButton>
          </DetailStyles.InformationModeButtonContainer>
          <DetailStyles.BottomSide>
            {/* Personal Infomation */}
            {bottomInfMode === "personalInformation" && !isEditMode && (
              <DetailStyles.GridContainer>
                <DetailStyles.GridItem>
                  <Typography weight="light">نام</Typography>
                  <Typography>{oneItem?.FirstName}</Typography>
                </DetailStyles.GridItem>
                <DetailStyles.GridItem>
                  <Typography weight="light">نام خانوادگی</Typography>
                  <Typography>{oneItem?.LastName}</Typography>
                </DetailStyles.GridItem>
                <DetailStyles.GridItem>
                  <Typography weight="light">کد ملی</Typography>
                  <Typography>{oneItem?.NationalCode}</Typography>
                </DetailStyles.GridItem>
                <DetailStyles.GridItem>
                  <Typography weight="light">تاریخ تولد</Typography>
                  <Typography>
                    {moment(oneItem?.Birthday).format("jYYYY-jMM-jDD")}
                  </Typography>
                </DetailStyles.GridItem>
                <DetailStyles.GridItem>
                  <Typography weight="light">نام پدر</Typography>
                  <Typography>{oneItem?.FatherName}</Typography>
                </DetailStyles.GridItem>
                <DetailStyles.GridItem>
                  <Typography weight="light">جنسیت</Typography>
                  <Typography>{gender}</Typography>
                </DetailStyles.GridItem>
              </DetailStyles.GridContainer>
            )}
            {/* Personal Information Form */}
            {bottomInfMode === "personalInformation" && isEditMode && (
              <DetailStyles.GridContainer>
                <DetailStyles.FormGroup>
                  <Typography weight="light">نام</Typography>
                  <Field
                    textAlign="center"
                    type={"text"}
                    placeHolder="نام کوچک خود را بنویسید"
                    onChange={personalInputChangeHandler}
                    value={personalFormState.FirstName}
                    name="FirstName"
                  />
                </DetailStyles.FormGroup>
                <DetailStyles.FormGroup>
                  <Typography weight="light">نام خانوادگی</Typography>
                  <Field
                    textAlign="center"
                    type={"text"}
                    placeHolder="نام خانوادگی خود را بنویسید"
                    onChange={personalInputChangeHandler}
                    value={personalFormState.LastName}
                    name="LastName"
                  />
                </DetailStyles.FormGroup>
                <DetailStyles.FormGroup>
                  <Typography weight="light">کد ملی</Typography>
                  <NewEmployeeStyles.RemoveArrows>
                    <Field
                      textAlign="center"
                      type={"number"}
                      placeHolder="کد ملی خود را بنویسید"
                      onInvalidMessage="لطفا کد ملی خود را وارد کنید"
                      required={true}
                      onChange={personalInputChangeHandler}
                      value={personalFormState.NationalCode}
                      name="NationalCode"
                    />
                  </NewEmployeeStyles.RemoveArrows>
                </DetailStyles.FormGroup>
                <DetailStyles.UnChangedInput>
                  <Typography weight="light">تاریخ تولد</Typography>
                  <DatePicker
                    placeHolder="لطفا تاریخ تولد خود را وارد کنید"
                    onChange={dateHandler}
                    value={personalFormState.Birthday}
                  />
                </DetailStyles.UnChangedInput>
                <DetailStyles.FormGroup>
                  <Typography weight="light">نام پدر</Typography>
                  <Field
                    textAlign="center"
                    type={"text"}
                    placeHolder="نام پدر خود را بنویسید"
                    onChange={personalInputChangeHandler}
                    value={personalFormState.FatherName}
                    name="FatherName"
                  />
                </DetailStyles.FormGroup>
                <DetailStyles.FormGroup>
                  <Typography weight="light">جنسیت</Typography>
                  <Dropdown
                    firstData={gender}
                    dropData={["مرد", "زن"]}
                    imageSrc={ArrowRed}
                    setSelectedState={setGenderHandler}
                    color="red"
                    width="100%"
                  />
                </DetailStyles.FormGroup>
              </DetailStyles.GridContainer>
            )}
            {/* User Information */}
            {bottomInfMode === "userInformation" && !isEditMode && (
              <DetailStyles.GridContainer>
                <DetailStyles.GridItem>
                  <Typography weight="light">شماره کارمندی</Typography>
                  <Typography>{oneItem?.PersonnelId}</Typography>
                </DetailStyles.GridItem>
                <DetailStyles.GridItem>
                  <Typography weight="light">کد شناسایی</Typography>
                  <Typography>{oneItem?.IdentificationCode}</Typography>
                </DetailStyles.GridItem>
                {/* <DetailStyles.GridItem>
              <Typography weight="light">رمز عبور</Typography>
              <Typography>{password.replace(/./g, "*")}</Typography>
            </DetailStyles.GridItem> */}
                <DetailStyles.GridItem>
                  <Typography weight="light">ایمیل</Typography>
                  <Typography>{oneItem?.User.Email}</Typography>
                </DetailStyles.GridItem>
              </DetailStyles.GridContainer>
            )}
            {/* UserInformation Form */}
            {bottomInfMode === "userInformation" && isEditMode && (
              <DetailStyles.GridContainer>
                <DetailStyles.FormGroup>
                  <Typography weight="light">شماره کارمندی</Typography>
                  <NewEmployeeStyles.RemoveArrows>
                    <Field
                      textAlign="center"
                      type={"number"}
                      placeHolder="به عدد بنویسید"
                      onChange={userInputChangeHandler}
                      value={userFormState.PersonnelId}
                      name="PersonnelId"
                    />
                  </NewEmployeeStyles.RemoveArrows>
                </DetailStyles.FormGroup>
                <DetailStyles.FormGroup>
                  <Typography weight="light">کد شناسایی</Typography>
                  <NewEmployeeStyles.RemoveArrows>
                    <Field
                      textAlign="center"
                      type={"number"}
                      placeHolder="به عدد بنویسید"
                      onChange={userInputChangeHandler}
                      value={userFormState.IdentificationCode}
                      name="IdentificationCode"
                    />
                  </NewEmployeeStyles.RemoveArrows>
                </DetailStyles.FormGroup>
                {/* <DetailStyles.FormGroupWithIcon>
              <Typography weight="light">رمز عبور</Typography>
              <div>
                <img src={EyeRed} alt="EyeRed" />
                <input
                  type="password"
                  placeholder="ترکیبی از اعداد و حروف بنویسید"
                  // onChange={userInputChangeHandler}
                  value={userFormState.password}
                  name="password"
                />
              </div>
            </DetailStyles.FormGroupWithIcon> */}
                <DetailStyles.FormGroup>
                  <Typography weight="light">ایمیل</Typography>
                  <Field
                    type="email"
                    placeholder="ایمیل خود را بنویسید"
                    onChange={userInputChangeHandler}
                    value={userFormState.Email}
                    name="Email"
                    required={true}
                  />
                </DetailStyles.FormGroup>
              </DetailStyles.GridContainer>
            )}
            {/* Button Container */}
            <DetailStyles.ButtonContainer>
              {isEditMode ? (
                <EditStyles.ButtonContainer>
                  <ConfirmButton
                    onClick={editModeDisableHandler}
                    variant="bordered"
                    color="orange"
                  >
                    <Typography>لغو</Typography>
                  </ConfirmButton>
                  <Button
                    onClick={confirmHandler}
                    display="flex"
                    align="center"
                    gap="12px"
                    imageWidth="20px"
                    variant="linear"
                    bg="linear-gradient(90deg,#ff8080 0%,#ffd011 100%)"
                    color="white"
                    hoverType="colorChange"
                    hoverBg="linear-gradient(90deg,#fc2b2b 0%,#ffcd00 100%)"
                  >
                    <Typography>ثبت اطلاعات</Typography>
                    <img src={Tick} alt="Tick" />
                  </Button>
                </EditStyles.ButtonContainer>
              ) : (
                <>
                  <Button
                    onClick={editModeEnableHandler}
                    variant="bordered"
                    hoverType="none"
                    padding="0 40px"
                    radius="30px"
                    color="orange"
                  >
                    <Typography weight="light">ویرایش اطلاعات</Typography>
                  </Button>
                  <Button
                    onClick={backToListHandler}
                    display="flex"
                    align="center"
                    gap="12px"
                    imageWidth="10px"
                    variant="linear"
                    bg="linear-gradient(90deg,#ff8080 0%,#ffd011 100%)"
                    color="white"
                    hoverType="colorChange"
                    hoverBg="linear-gradient(90deg,#fc2b2b 0%,#ffcd00 100%)"
                  >
                    <img src={ArrowWhite} alt="ArrowWhite" />
                    <Typography>بازگشت</Typography>
                  </Button>
                </>
              )}
            </DetailStyles.ButtonContainer>
          </DetailStyles.BottomSide>
        </>
      )}
    </DetailStyles.Container>
  );
};
