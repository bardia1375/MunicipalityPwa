// Components
import { Typography } from "components/common";

// Styled Elements
import { SendMessageStyles } from "assets/styles/home/employees";

// Images
import Trash from "assets/images/common/trash/white-color-red-bg.svg";

export const MessageReciver = ({ id, reciverName, onRemove }) => {
  const removeHandler = () => onRemove(id);

  return (
    <SendMessageStyles.ReciverItem>
      <img onClick={removeHandler} src={Trash} alt="Trash" />
      <Typography>{reciverName}</Typography>
    </SendMessageStyles.ReciverItem>
  );
};
