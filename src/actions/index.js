export const SET_AUTH = () => {
  return {
    type: "SET_AUTH",
  };
};

export const SET_USER = (object = null) => {
  return {
    type: "SET_USER",
    payload: object,
  };
};

export const SET_PRODUCT = (object = null) => {
  return {
    type: "SET_PRODUCT",
    payload: object,
  };
};

export const ADD_PRODUCT = (object = null) => {
  return {
    type: "ADD_PRODUCT",
    payload: object,
  };
};

export const DELETE_PRODUCT = (id = null) => {
  return {
    type: "DELETE_PRODUCT",
    payload: id,
  };
};
