import { configureStore } from "@reduxjs/toolkit";

import authSlice from "routes/Auth/Module";

import employeesSlice from "routes/Home/Employees/Module";
import deletedEmployeesSlice from "routes/Home/Employees/DeletedList/Module";

const store = configureStore({
  reducer: {
    auth: authSlice,
    employees: employeesSlice,
    deletedEmployees: deletedEmployeesSlice,
  },
});

export default store;
