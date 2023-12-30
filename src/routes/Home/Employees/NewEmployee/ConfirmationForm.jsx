import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { addNewEmployee } from "routes/Home/Employees/Module";

// Components
import { Typography, Button } from "components/common";

// Styled Elements
import { NewEmployeeStyles } from "assets/styles/home/employees";

// Images
import ArrowWhite from "assets/images/common/arrows/white-left.svg";
import Tick from "assets/images/common/tick/white-color.svg";
import moment from "moment-jalaali";

export const ConfirmationForm = ({ newEmployee, setStep }) => {
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Props
  const { personalInformation, userInformation } = newEmployee;
  const { Token } = useSelector((state) => state.auth);
  // Handlers
  const confirmHandler = () => {
    const template = {
      UserName: personalInformation.firstName,
      PassWord: userInformation.password,
      PersonnelId: userInformation.employeeId,
      IdentificationCode: userInformation.identificationNumber,
      FirstName: personalInformation.firstName,
      LastName: personalInformation.lastName,
      NationalCode: personalInformation.nationalCode,
      FatherName: personalInformation.fatherName,
      Birthday: moment(personalInformation.birthDate, "jYYYY-jMM-jDD").format(
        "YYYY-MM-DD"
      ),
      BirthCertificateNumber: userInformation.identificationNumber,
      Nationality: "Iran",
      Married: 0,
      Sex: personalInformation.gender === "مرد" ? 1 : 2,
      RegionId: null,
      Address: "address",
      Education: 0,
      Military: 0,
      Description: null,
      Email: userInformation.email,
      // informationMethod: {
      //   withEmail: false,
      //   withMessage: false,
      //   withWhatsapp: false,
      // },
    };
    dispatch(addNewEmployee(Token, template));
    navigate("/employees/list");
  };
  return (
    <NewEmployeeStyles.ConfirmationContainer>
      <NewEmployeeStyles.GridContainer>
        <NewEmployeeStyles.GridItem>
          <Typography weight="light">نام</Typography>
          <Typography>{personalInformation.firstName}</Typography>
        </NewEmployeeStyles.GridItem>
        <NewEmployeeStyles.GridItem>
          <Typography weight="light">نام خانوادگی</Typography>
          <Typography>{personalInformation.lastName}</Typography>
        </NewEmployeeStyles.GridItem>
        <NewEmployeeStyles.GridItem>
          <Typography weight="light">کد ملی</Typography>
          <Typography>{personalInformation.nationalCode}</Typography>
        </NewEmployeeStyles.GridItem>
        <NewEmployeeStyles.GridItem>
          <Typography weight="light">تاریخ تولد</Typography>
          <Typography>{personalInformation.birthDate}</Typography>
        </NewEmployeeStyles.GridItem>
        <NewEmployeeStyles.GridItem>
          <Typography weight="light">نام پدر</Typography>
          <Typography>{personalInformation.fatherName}</Typography>
        </NewEmployeeStyles.GridItem>
        <NewEmployeeStyles.GridItem>
          <Typography weight="light">جنسیت</Typography>
          <Typography>{personalInformation.gender}</Typography>
        </NewEmployeeStyles.GridItem>
      </NewEmployeeStyles.GridContainer>
      <NewEmployeeStyles.GridContainer>
        <NewEmployeeStyles.GridItem>
          <Typography weight="light">شماره کارمندی</Typography>
          <Typography>{userInformation.employeeId}</Typography>
        </NewEmployeeStyles.GridItem>
        <NewEmployeeStyles.GridItem>
          <Typography weight="light">کد شناسایی</Typography>
          <Typography>{userInformation.identificationNumber}</Typography>
        </NewEmployeeStyles.GridItem>
        <NewEmployeeStyles.GridItem>
          <Typography weight="light">رمز عبور</Typography>
          <Typography>{userInformation.password.replace(/./g, "*")}</Typography>
        </NewEmployeeStyles.GridItem>
        <NewEmployeeStyles.GridItem>
          <Typography weight="light">ایمیل</Typography>
          <Typography>{userInformation.email}</Typography>
        </NewEmployeeStyles.GridItem>
      </NewEmployeeStyles.GridContainer>
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
      </NewEmployeeStyles.ButtonContainer>
    </NewEmployeeStyles.ConfirmationContainer>
  );
};
