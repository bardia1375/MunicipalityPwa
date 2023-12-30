import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { editEmployee } from "routes/Home/Employees/Module";

// Components
import { Typography, Button } from "components/common";

// Styled Elements
import { EditStyles } from "assets/styles/home/employees";

// Images
import Tick from "assets/images/common/tick/white-color.svg";
import ArrowWhite from "assets/images/common/arrows/white-left.svg";
import moment from "moment-jalaali";

export const ConfirmationForm = ({
  newEmployee,
  navigateAddress,
  setStep,
  currentPage,
}) => {
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Destracturing information
  const { Token } = useSelector((state) => state.auth);
  const { oneItem } = useSelector((state) => state.employees);

  // useEffect(() => {
  //   dispatch(oneEmployee(Token, params.id));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);
  // Props
  const { personalInformation, userInformation } = newEmployee;
  // Handlers
  const confirmHandler = () => {
    const template = {
      ...oneItem,
      FirstName: personalInformation.FirstName,
      LastName: personalInformation.LastName,
      NationalCode: personalInformation.NationalCode,
      Birthday: moment(personalInformation.Birthday, "jYYYY-jMM-jDD").format(
        "YYYY-MM-DD"
      ),
      FatherName: personalInformation.FatherName,
      Sex: personalInformation.Sex === "مرد" ? 1 : 2,
      PersonnelId: userInformation.PersonnelId,
      IdentificationCode: userInformation.IdentificationCode,
      Email: userInformation.Email,
      NewPassword: userInformation.Password,
    };
    dispatch(editEmployee(Token, template, currentPage));
    navigate(navigateAddress, {
      state: { currentPage: currentPage, comingFrom: "edit" },
    });
  };

  return (
    <EditStyles.ConfirmationContainer>
      <EditStyles.GridContainer>
        <EditStyles.GridItem>
          <Typography weight="light">نام</Typography>
          <Typography>{personalInformation.FirstName}</Typography>
        </EditStyles.GridItem>
        <EditStyles.GridItem>
          <Typography weight="light">نام خانوادگی</Typography>
          <Typography>{personalInformation.LastName}</Typography>
        </EditStyles.GridItem>
        <EditStyles.GridItem>
          <Typography weight="light">کد ملی</Typography>
          <Typography>{personalInformation.NationalCode}</Typography>
        </EditStyles.GridItem>
        <EditStyles.GridItem>
          <Typography weight="light">تاریخ تولد</Typography>
          <Typography>{personalInformation.Birthday}</Typography>
        </EditStyles.GridItem>
        <EditStyles.GridItem>
          <Typography weight="light">نام پدر</Typography>
          <Typography>{personalInformation.FatherName}</Typography>
        </EditStyles.GridItem>
        <EditStyles.GridItem>
          <Typography weight="light">جنسیت</Typography>
          <Typography>{personalInformation.Sex}</Typography>
        </EditStyles.GridItem>
      </EditStyles.GridContainer>
      <EditStyles.GridContainer>
        <EditStyles.GridItem>
          <Typography weight="light">شماره کارمندی</Typography>
          <Typography>{userInformation.PersonnelId}</Typography>
        </EditStyles.GridItem>
        <EditStyles.GridItem>
          <Typography weight="light">کد شناسایی</Typography>
          <Typography>{userInformation.IdentificationCode}</Typography>
        </EditStyles.GridItem>
        <EditStyles.GridItem>
          <Typography weight="light">رمز عبور</Typography>
          {/* <Typography>email</Typography> */}
          <Typography>{"******".replace(/./g, "*")}</Typography>
        </EditStyles.GridItem>
        <EditStyles.GridItem>
          <Typography weight="light">ایمیل</Typography>
          <Typography>{userInformation.Email}</Typography>
        </EditStyles.GridItem>
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
            // width={18}
            // height={18}
            style={{ transform: "rotate(180deg)" }}
            src={ArrowWhite}
            alt="ArrowWhite"
          />
          <Typography>مرحله قبل</Typography>
        </Button>
        <Button
          onClick={confirmHandler}
          variant="linear"
          display="flex"
          align="center"
          gap="20px"
          padding="2px 20px"
          color="white"
          bg="linear-gradient(252deg, #37abb8 0%, #71fbff 100%)"
          hoverType="colorChange"
          hoverBg="linear-gradient(253deg, #2995a1 0%, #53d1da 56%, #71fbff 100%)"
        >
          <Typography>ثبت اطلاعات</Typography>
          <img src={Tick} alt="Tick" />
        </Button>
      </EditStyles.ButtonContainer>
    </EditStyles.ConfirmationContainer>
  );
};
