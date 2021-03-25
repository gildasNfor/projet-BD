import { actionTypes } from "../actions/authActions";

const initialState = {
  user: null,
  allUsers: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.user };

    case actionTypes.ALL_USERS:
      return { ...state, allUsers: action.users };

    default:
      return state;
  }
};

export default authReducer;
