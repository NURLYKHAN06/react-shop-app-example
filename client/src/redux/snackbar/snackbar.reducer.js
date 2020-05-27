import { createSelector } from "reselect";

export const SnackbarActionTypes = {
  SNACKBAR_ON: "SNACKBAR_ON",
  CLEAR_SNACKBAR: "CLEAR_SNACKBAR",
};

const INITIAL_STATE = {
  message: "",
  type: null,
};

const snackbarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SnackbarActionTypes.SNACKBAR_ON:
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    case SnackbarActionTypes.CLEAR_SNACKBAR:
      return {
        message: "",
        type: null,
      };
    default:
      return state;
  }
};

export const selectSnackbar = createSelector(
  [(state) => state.snackbar],
  (snackbar) => snackbar
);

export default snackbarReducer;
