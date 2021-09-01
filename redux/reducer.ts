export const initialState = {};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_LOGIN_DATA":
      return {
        enteredUserName: action.payload.userName,
        PAT: action.payload.PAT,
      };
    default:
      return state;
  }
};
