const user = sessionStorage.getItem("userData");

export const userReducer = (state = JSON.parse(user), action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;

    default:
      return state;
  }
};
