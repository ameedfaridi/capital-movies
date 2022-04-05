import { SET_MODAL_BODY, TOGGLE_LOADING, TOGGLE_MODAL } from "./constants";

export const uiReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return { ...state, isModalOpen: !state.isModalOpen };
    case SET_MODAL_BODY:
      return { ...state, activeComponent: action.activeComponent };
    case TOGGLE_LOADING:
      return { ...state, isLoading: !state.isLoading };
    default:
      return state;
  }
};
