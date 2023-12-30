import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// Components
import { Button, Typography } from "components/common";

// Styled Elements
import { DetailStyles } from "assets/styles/home/employees";

// Images
import ArrowWhite from "assets/images/common/arrows/white-right.svg";

export const DeletedEmployee = () => {
  // Hooks
  const navigate = useNavigate();
  const params = useParams();
  const employeeInformation = useSelector(
    state => state.deletedEmployees.items.filter(item => item.id === params.id)[0]
  );

  // Destracturing information
  const {
    fullName,
    employeeId,
    position,
    deleteTime,
    deleteCause,
    personalInformation,
    userInformation,
  } = employeeInformation;

  // States
  const [bottomInfMode, setBottomInfMode] = useState("personalInformation");

  // Handlers
  const showPersonalInformationHandler = () => setBottomInfMode("personalInformation");
  const showUserInformationHandler = () => setBottomInfMode("userInformation");
  const backToListHandler = () => navigate("/employees/deleted-list");

  return (
    <DetailStyles.Container>
      <DetailStyles.TopSide>
        <DetailStyles.DeletedListHead>
          <Typography>نام کارمند</Typography>
          <Typography>شماره کارمندی</Typography>
          <Typography>سمت</Typography>
          <Typography>تاریخ حذف</Typography>
          <Typography>علت حذف</Typography>
        </DetailStyles.DeletedListHead>
        <DetailStyles.DeletedListItem>
          <Typography>{fullName}</Typography>
          <Typography weight="light">{employeeId}</Typography>
          <Typography weight="light">{position}</Typography>
          <Typography weight="light">{deleteTime}</Typography>
          <Typography weight="light">{deleteCause}</Typography>
        </DetailStyles.DeletedListItem>
      </DetailStyles.TopSide>
      {/* Change Infomation Mode Buttons */}
      <DetailStyles.InformationModeButtonContainer>
        <DetailStyles.InformationModeButton>
          <Typography onClick={showPersonalInformationHandler}>اطلاعات فردی</Typography>
        </DetailStyles.InformationModeButton>
        <DetailStyles.InformationModeButton>
          <Typography onClick={showUserInformationHandler}>اطلاعات کارمندی</Typography>
        </DetailStyles.InformationModeButton>
      </DetailStyles.InformationModeButtonContainer>
      <DetailStyles.BottomSide>
        {/* Personal Infomation */}
        {bottomInfMode === "personalInformation" && (
          <DetailStyles.GridContainer>
            <DetailStyles.GridItem>
              <Typography weight="light">نام</Typography>
              <Typography>{personalInformation.firstName}</Typography>
            </DetailStyles.GridItem>
            <DetailStyles.GridItem>
              <Typography weight="light">نام خانوادگی</Typography>
              <Typography>{personalInformation.lastName}</Typography>
            </DetailStyles.GridItem>
            <DetailStyles.GridItem>
              <Typography weight="light">کد ملی</Typography>
              <Typography>{personalInformation.nationalCode}</Typography>
            </DetailStyles.GridItem>
            <DetailStyles.GridItem>
              <Typography weight="light">تاریخ تولد</Typography>
              <Typography>{personalInformation.birthDate}</Typography>
            </DetailStyles.GridItem>
            <DetailStyles.GridItem>
              <Typography weight="light">نام پدر</Typography>
              <Typography>{personalInformation.fatherName}</Typography>
            </DetailStyles.GridItem>
            <DetailStyles.GridItem>
              <Typography weight="light">جنسیت</Typography>
              <Typography>{personalInformation.gender}</Typography>
            </DetailStyles.GridItem>
          </DetailStyles.GridContainer>
        )}

        {/* User Information */}
        {bottomInfMode === "userInformation" && (
          <DetailStyles.GridContainer>
            <DetailStyles.GridItem>
              <Typography weight="light">شماره کارمندی</Typography>
              <Typography>{userInformation.employeeId}</Typography>
            </DetailStyles.GridItem>
            <DetailStyles.GridItem>
              <Typography weight="light">کد شناسایی</Typography>
              <Typography>{userInformation.identificationNumber}</Typography>
            </DetailStyles.GridItem>
            <DetailStyles.GridItem>
              <Typography weight="light">رمز عبور</Typography>
              <Typography>{userInformation.password.replace(/./g, "*")}</Typography>
            </DetailStyles.GridItem>
            <DetailStyles.GridItem>
              <Typography weight="light">ایمیل</Typography>
              <Typography>{userInformation.email}</Typography>
            </DetailStyles.GridItem>
          </DetailStyles.GridContainer>
        )}

        {/* Button Container */}
        <DetailStyles.ButtonContainer>
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
        </DetailStyles.ButtonContainer>
      </DetailStyles.BottomSide>
    </DetailStyles.Container>
  );
};
