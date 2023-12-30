import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Componnets
import { MessageReciver } from "./MessageReciver";
import { Button, Typography } from "components/common";

// Styled Elements
import { SendMessageStyles } from "assets/styles/home/employees";

export const Container = () => {
  const location = useLocation();
  const user = location.state;
  const [messageRecivers, setMessageRecivers] = useState([]);

  const removeReciverHandler = (id) => {
    setMessageRecivers((prevState) =>
      prevState.filter((item) => item.id !== id)
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  // Check user has exist on load page
  useEffect(() => {
    if (user) setMessageRecivers((prevState) => [...prevState, user]);
  }, [user]);

  return (
    <SendMessageStyles.Container>
      <Typography size="xl" weight="medium">
        لطفا خانه های زیر را پر کنید:
      </Typography>
      <SendMessageStyles.Form onSubmit={submitHandler}>
        <div>
          <Typography size="base" weight="light">
            شماره تماس یا نام کاربر را وارد کنید:
          </Typography>
          <SendMessageStyles.ReciversContainer>
            {messageRecivers.map((item) => (
              <MessageReciver
                key={item.userId}
                id={item.userId}
                reciverName={item.firstName + " " + item.lastName}
                onRemove={removeReciverHandler}
              />
            ))}
          </SendMessageStyles.ReciversContainer>
        </div>
        <textarea placeholder="متن پیامک"></textarea>
        <SendMessageStyles.ButtonContainer>
          <Button
            variant="linear"
            bg="linear-gradient(90deg,#ff8080 0%,#ffd011 100%)"
            color="white"
            hoverType="colorChange"
            hoverBg="linear-gradient(90deg,#fc2b2b 0%,#ffcd00 100%)"
          >
            <Typography size="base" weight="light">
              ارسال پیامک
            </Typography>
          </Button>
        </SendMessageStyles.ButtonContainer>
      </SendMessageStyles.Form>
    </SendMessageStyles.Container>
  );
};
