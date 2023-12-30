import { useSelector } from "react-redux";

// Styled Elements
import { TableComponent } from "components/common/publicTable/Main";
import { useEffect, useState } from "react";
import { fetchDeletedEmployees, recoverEmployee } from "../Module";

export const Container = () => {
  const [dataList, setDataList] = useState(null);
  const [paginations, setPaginations] = useState(null);
  //Get employees list
  const { deletedItems, loading, pagination } = useSelector(
    (state) => state.employees
  );

  //Set the correct input for table's data
  useEffect(() => {
    setDataList(
      deletedItems?.map((item) => [
        item.FirstName !== null || undefined
          ? item.FirstName
          : " " + item.LastName !== null || undefined
          ? item.lastName
          : " ",
        item.PersonnelId !== null || undefined ? item.PersonnelId : " ",
        item.FatherName !== null || undefined ? item.FatherName : " ",
        item.Unique !== null || undefined ? item.Unique : " ",
      ])
    );
    setPaginations(pagination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  //Set Titles
  const titles = [
    { title: "نام کاربری" },
    { title: "شماره کارمندی" },
    { title: "سمت" },
  ];
  return (
    <TableComponent
      page={"حذفیات"}
      recoveryButton={true}
      trashRedButton={true}
      data={dataList}
      title={titles}
      pagination={paginations?.PageCount}
      loading={loading}
      fetchData={fetchDeletedEmployees}
      fetchRecoverData={recoverEmployee}
    />
  );
};
