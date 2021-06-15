export const actionTypes = {
  SET_MY_TONTINES: "SET_MY_TOTINES",
  SET_ALL_TONTINES: "SET_ALL_TONTINES",
  SET_ACTIVE_TONTINE: "SET_ACTIVE_TONTINE",
};

export const setMyTontines = tontines => {
  return {
    type: actionTypes.SET_MY_TONTINES,
    tontines,
  };
};

export const setAllTontines = tontines => {
  return {
    type: actionTypes.SET_ALL_TONTINES,
    tontines,
  };
};

export const setActiveTontine = tontine => {
  return {
    type: actionTypes.SET_ACTIVE_TONTINE,
    tontine,
  };
};
