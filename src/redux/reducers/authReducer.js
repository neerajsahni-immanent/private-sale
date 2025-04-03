import GlobalTypes from "../actions/GlobalTypes";
const initialState = {
  auth: null,
};
// Define the reducer function
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GlobalTypes.AUTH:
      return {
        ...state,
        auth: action.payload,
      };

    // Add other cases for different actions if needed
    default:
      return state;
  }
};

export default authReducer;
