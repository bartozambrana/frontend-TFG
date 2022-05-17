import { types } from "../types/types";

const initialState = {
  checking: true,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        checking: false,
        ...action.payload,
      };
    case types.checkingFinish:
      return {
        ...state,
        checking: false,
      };
    case types.logout:
      return {
        checking: false,
      };

    case types.putUser:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
