import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../../config/config.json";

const initialState = {
  loading: false,
  items: null,
  // {
  //   id: 1,
  //   fullName: "test",
  //   employeeId: "23",
  //   position: "test",
  //   deleteTime: "1400/2/2",
  //   deleteCause: "test",
  // },
};

const deletedEmployeesSlice = createSlice({
  name: "deletedEmployees",
  initialState,
  reducers: {
    addDeletedEmployee(state, action) {
      const updatedItems = [...state.items];

      updatedItems.push(action.payload);

      return { ...state, items: updatedItems };
    },
    removeFromDeletedEmployee(state, action) {
      let updatedItems = [...state.items];
      updatedItems = updatedItems.filter((item) => item.id !== action.payload);

      return { ...state, items: updatedItems };
    },
    setLoading: () => {
      return {
        loading: true,
      };
    },
    setDeletedList: (state, { payload }) => {
      return {
        items: payload.result,
        loading: false,
      };
    },
  },
});

export const {
  addDeletedEmployee,
  removeFromDeletedEmployee,
  setLoading,
  setDeletedList,
} = deletedEmployeesSlice.actions;
export default deletedEmployeesSlice.reducer;

// set up axios
const myApi = axios.create({
  baseURL: api.getAllDeletedEmployees,
  withCredentials: false,
  headers: {
    Accept: "*/*",
  },
});

// fetch deleted list
export function fetchDeletedList(Token, pageNumber, limitNumber) {
  return async (dispatch) => {
    dispatch(setLoading());
    myApi
      .get("", {
        headers: { Authorization: `Bearer ${Token}` },
        params: { Page: pageNumber, Limit: limitNumber },
      })
      .then((response) => {
        dispatch(setDeletedList(response.data));
      });
  };
}
