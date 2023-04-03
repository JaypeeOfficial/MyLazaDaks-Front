export const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PRODUCT":
      return action.payload;

    case "ADD_PRODUCT":
      return [...state, action.payload];

    case "DELETE_PRODUCT":
      return state.filter((product) => product.id != action.payload);

    default:
      return state;
  }
};
