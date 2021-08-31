const initialState = {};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_INDEX_DATA":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
