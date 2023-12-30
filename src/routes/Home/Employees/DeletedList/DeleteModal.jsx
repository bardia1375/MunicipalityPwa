import { useDispatch } from "react-redux";

// Redux
import { removeFromDeletedEmployee } from "./Module";

// Components
import { Modal, ConfirmButton, Typography } from "components/common";

// Styled Elements
import { DeletedListStyles } from "assets/styles/home/employees";

// Images
import Close from "assets/images/common/close/white-color-red-bg.svg";
import Hoshdar from "assets/images/employees/hoshdar-red.svg";

export const DeleteModal = ({ onClose, id }) => {
  // Hooks
  const dispatch = useDispatch();

  // Handlers
  const closeModalHandler = () => onClose(false);
  const confirmHandler = () => {
    dispatch(removeFromDeletedEmployee(id));
    closeModalHandler();
  };

  return (
    <Modal>
      <DeletedListStyles.CloseBadge onClick={closeModalHandler} src={Close} alt="Close" />
      <DeletedListStyles.DeleteContainer>
        <DeletedListStyles.TopSide>
          <Typography size="xl" weight="light">
            آیا از حذف کامل این کارمند مطمئنید؟
          </Typography>
          <div>
            <ConfirmButton onClick={confirmHandler} variant="bordered">
              <Typography>بله</Typography>
            </ConfirmButton>
            <ConfirmButton onClick={closeModalHandler}>
              <Typography>خیر</Typography>
            </ConfirmButton>
          </div>
        </DeletedListStyles.TopSide>
        <DeletedListStyles.BottomSide>
          <img src={Hoshdar} alt="Hoshdar" />
          <Typography>هشدار:</Typography>
          <Typography weight="light">
            با حذف کامل، دیگر به اطلاعات این کارمند دست نخواهید یافت
          </Typography>
        </DeletedListStyles.BottomSide>
      </DeletedListStyles.DeleteContainer>
    </Modal>
  );
};
