import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { addEmployee } from "routes/Home/Employees/Module";
import { removeFromDeletedEmployee } from "routes/Home/Employees/DeletedList/Module";

// Components
import { Typography } from "components/common";
import { DeleteModal } from "./DeleteModal";

// Styled Elements
import { DeletedListStyles } from "assets/styles/home/employees";

// Images
import Trash from "assets/images/item-actions/trash-red-color-white-bg.svg";
import Recovery from "assets/images/item-actions/recovery.svg";

export const ListItem = ({ employeeInformation }) => {
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Props
  const { id, fullName, employeeId, position, deleteTime, deleteCause } =
    employeeInformation;

  // State
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  // Handlers
  const deleteModeChangeHandler = (bool) => setIsDeleteMode(bool);
  const recoveryEmployeeHandler = () => {
    dispatch(addEmployee({ ...employeeInformation }));
    dispatch(removeFromDeletedEmployee(employeeInformation.id));
  };

  // Navigators
  const goToDetailPageHandler = () => navigate(`/employees/deleted-list/${id}`);

  return (
    <>
      {isDeleteMode && (
        <DeleteModal
          onClose={deleteModeChangeHandler}
          id={employeeInformation.id}
        />
      )}
      <DeletedListStyles.ListItem isDeleteMode={isDeleteMode}>
        <Typography onClick={goToDetailPageHandler}>{fullName}</Typography>
        <Typography onClick={goToDetailPageHandler} weight="light">
          {employeeId}
        </Typography>
        <Typography onClick={goToDetailPageHandler} weight="light">
          {position}
        </Typography>
        <Typography onClick={goToDetailPageHandler} weight="light">
          {deleteTime}
        </Typography>
        <div>
          <Typography onClick={goToDetailPageHandler} weight="light">
            {deleteCause}
          </Typography>
          {!isDeleteMode && (
            <DeletedListStyles.ListItemActions>
              <img
                src={Recovery}
                alt="Recovery"
                onClick={recoveryEmployeeHandler}
              />
              <img
                src={Trash}
                alt="Trash"
                onClick={() => deleteModeChangeHandler(true)}
              />
            </DeletedListStyles.ListItemActions>
          )}
        </div>
      </DeletedListStyles.ListItem>
    </>
  );
};
