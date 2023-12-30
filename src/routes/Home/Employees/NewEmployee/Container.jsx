import { useState } from "react";

// Components
import { PersonalInformationForm } from "./PersonalInformationForm";
import { UserInformationForm } from "./UserInformationForm";
import { ConfirmationForm } from "./ConfirmationForm";
import { Typography, Progress } from "components/common";

// Styled Elements
import { NewEmployeeStyles } from "assets/styles/home/employees";

export const Container = () => {
  // States
  const [step, setStep] = useState(1);
  const [newEmployee, setNewEmployee] = useState({
    personalInformation: {},
    userInformation: {},
  });

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
    <NewEmployeeStyles.Container>
      <Typography size="xl" weight="light">
        {title}
      </Typography>
      <NewEmployeeStyles.Content>
        <Progress
          step={step}
          texts={["اطلاعات فردی", "اطلاعات کاربری", "تایید نهایی"]}
        />
        {step === 1 && (
          <PersonalInformationForm
            dataShow={newEmployee?.personalInformation}
            onChangeStep={changeStepHandler}
          />
        )}
        {step === 2 && (
          <UserInformationForm
            dataShow={newEmployee?.userInformation}
            setStep={setStep}
            onChangeStep={changeStepHandler}
          />
        )}
        {step === 3 && (
          <ConfirmationForm setStep={setStep} newEmployee={newEmployee} />
        )}
      </NewEmployeeStyles.Content>
    </NewEmployeeStyles.Container>
  );
};
