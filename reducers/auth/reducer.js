import { TOGGLE_LOGIN, SET_USERNAME, SET_EMAIL } from "./constants";

export const authReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN:
      return { ...state, isLogin: !state.isLogin };
    case SET_USERNAME:
      return { ...state, username:action.username };
    case SET_EMAIL:
      return { ...state, email: action.email };

    default:
      return state;
  }
};
