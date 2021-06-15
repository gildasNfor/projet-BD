import { actionTypes } from "../actions/authActions";

const initialState = {
  user: null,
  details: null,
  isAuthenticated: false,
  allUsers: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.user };

    case actionTypes.ALL_USERS:
      return { ...state, allUsers: action.users };

    case actionTypes.AUTH:
      return { ...state, isAuthenticated: action.result };

    case actionTypes.SET_DETAILS:
      return { ...state, details: action.details };

    default:
      return state;
  }
};

export default authReducer;
