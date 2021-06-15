import { actionTypes } from "../actions/tontineActions";

const initialState = {
  activeTontine: null,
  myTontines: [],
  allTontines: [],
};

const tontineReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MY_TONTINES:
      return { ...state, myTontines: action.tontines };

    case actionTypes.SET_ALL_TONTINES:
      return { ...state, allTontines: action.tontines };

    case actionTypes.SET_ACTIVE_TONTINE:
      return { ...state, activeTontine: action.tontine };

    default:
      return state;
  }
};

export default tontineReducer;
