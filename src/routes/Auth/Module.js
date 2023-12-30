import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myApi from "config/axios";
// import { loginApi } from "config/httpService";
import { errorMessage } from "services/toast";
import { decodeToken } from "./../../services/decodeToken";

export const userLogin = createAsyncThunk("users/login", async (loginInfo) => {
  try {
    const res = await myApi.post("Login/Login", loginInfo);
    localStorage.setItem("personsData", JSON.stringify(res.data.Result));
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const passwordRecovery = createAsyncThunk(
  "users/passwordRecovery",
  async (username) => {
    try {
      const res = await myApi.post("rec", username);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const logout = createAsyncThunk("users/logout", async (loginInfo) => {
  try {
    localStorage.removeItem("tickmentAd_AccessToken");
  } catch (error) {
    console.log(error);
  }
});
export const verifyToken = createAsyncThunk("users/verifyToken", async () => {
  try {
    const token = localStorage.getItem("tickmentAd_AccessToken");
    if (token) {
      const decodedToken = await decodeToken(token);
      const dateNow = Date.now() / 1000;
      if (decodedToken.exp < dateNow) {
        localStorage.removeItem("tickmentAd_AccessToken");
        return { Token: null, expiredAt: decodedToken.exp };
      } else {
        const decodedToken = await decodeToken(token);

        return { Token: token, expiredAt: decodedToken.exp };
      }
    }
    return { Token: null };
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  Token: null, // manage the access token
  expiredAt: null, // manage expiry time of the access token

  authLoading: true, // to indicate that the auth API is in progress
  isAuthenticated: true, // consider as a authentication flag
  userLoginLoading: false, // to indicate that the user signin API is in progress
  loginError: null, // manage the error of the user signin API
  //
  FirstName: "",
  LastName: "",
  Name: "",
  ProfileCompleted: false,
  NewMessages: 0,
  Type: "",
};

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAuthentication(state, action) {
      localStorage.removeItem("tickmentAd_AccessToken");
      localStorage.removeItem("tickmentAd_RefreshToken");
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.userLoginLoading = true;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      if (payload?.Result) {
        // successMessage("با موفقیت وارد شدید");
        // setTimeout(function () { window.location.reload(1); }, 0);
        localStorage.setItem(
          "tickmentAd_AccessToken",
          payload.Result.AccessToken
        );
        localStorage.setItem(
          "tickmentAd_RefreshToken",
          payload.Result.RefreshToken
        );

        return {
          ...state,
          Token: payload.Result.AccessToken,
          isAuthenticated: true,
          authLoading: false,
          userLoginLoading: false,
          Avatar: payload.Result.Avatar,
          FirstName: payload.Result.FirstName,
          LastName: payload.Result.LastName,
          PersonnelId: payload.Result.PersonnelId,
          ...payload.Result,
        };
      } else {
        errorMessage("شماره همراه یا رمز عبور اشتباه می‌باشد");
        return {
          ...state,
          // loginError: error,
          userLoginLoading: false,
        };
      }
    },
    [userLogin.d]: (state) => {
      state.userLoginLoading = false;
    },

    [passwordRecovery.pending]: (state) => {},
    [passwordRecovery.fulfilled]: (state, { payload }) => {
      if (payload.Data) {
      } else {
      }
    },
    [passwordRecovery.rejected]: (state) => {},

    [verifyToken.fulfilled]: (state, { payload }) => {
      if (payload.Token) {
        return {
          ...state,
          isAuthenticated: true,
          authLoading: false,
          userLoginLoading: false,
          ...payload,
        };
      } else {
        return {
          ...initialState,
          authLoading: false,
        };
      }
    },
    [verifyToken.rejected]: (state) => {
      console.log("rejected");
    },
    [logout.fulfilled]: (state, { payload }) => {
      return {
        ...initialState,
        authLoading: false,
      };
    },
    [logout.rejected]: (state) => {
      console.log("rejected logout");
    },
  },
});

export const { setAuthentication } = authSlice.actions;
export default authSlice.reducer;
