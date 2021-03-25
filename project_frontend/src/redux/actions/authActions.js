export const actionTypes = {
  SET_USER: "SET_USER",
  ALL_USERS: "ALL_USERS",
};

export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    user,
  };
};

export const setAllUsers = users => {
  return {
    type: actionTypes.ALL_USERS,
    users,
  };
};
