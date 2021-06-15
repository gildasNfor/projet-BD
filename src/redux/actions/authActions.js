export const actionTypes = {
  SET_USER: "SET_USER",
  SET_DETAILS: "SET_DETAILS",
  ALL_USERS: "ALL_USERS",
  AUTH: "AUTHENTICATE",
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

export const authenticated = result => {
  return {
    type: actionTypes.ALL_USERS,
    result,
  };
};

export const setDetails = details => {
  return {
    type: actionTypes.SET_DETAILS,
    details,
  };
};
