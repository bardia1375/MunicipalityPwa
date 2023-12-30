import { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import { PersonalInformationForm } from "./PersonalInformationForm";
import { UserInformationForm } from "./UserInformationForm";
import { ConfirmationForm } from "./ConfirmationForm";
import { Typography, Progress } from "components/common";

// Styled Elements
import { EditStyles } from "assets/styles/home/employees";

export const Container = () => {
  // States
  const [step, setStep] = useState(1);
  const [newEmployee, setNewEmployee] = useState({});
  const { state } = useLocation();
  const { currentPage, from } = state;
  const changeStepHandler = (key, data) => {
    setNewEmployee((prevState) => ({ ...prevState, [key]: { ...data } }));
    setStep((prevStep) => prevStep + 1);
  };

  // Handle Title
  let title = "لطفا اطلاعات فردی کارمندی را بنویسید";
  if (step === 2) {
    title = "لطفا اطلاعات کاربری کارمند را بنویسید";
  } else if (step === 3) {
    title = "لطفا درستی اطلاعات کارمند را بررسی کنید";
  }
  return (
    <EditStyles.Container>
      <Typography size="xl" weight="light">
        {title}
      </Typography>
      <EditStyles.Content>
        <Progress
          step={step}
          texts={["اطلاعات فردی", "اطلاعات کاربری", "تایید نهایی"]}
        />
        {step === 1 && (
          <PersonalInformationForm
            currentPage={currentPage}
            onChangeStep={changeStepHandler}
            navigateAddress={from}
          />
        )}
        {step === 2 && (
          <UserInformationForm
            setStep={setStep}
            onChangeStep={changeStepHandler}
          />
        )}
        {step === 3 && (
          <ConfirmationForm
            currentPage={currentPage}
            setStep={setStep}
            newEmployee={newEmployee}
            navigateAddress={from}
          />
        )}
      </EditStyles.Content>
    </EditStyles.Container>
  );
};
