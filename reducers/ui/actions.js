import { TOGGLE_MODAL, SET_MODAL_BODY, TOGGLE_LOADING } from "./constants";

export const toggleModal = () =>({type:TOGGLE_MODAL});
export const toggleLoading = () =>({type:TOGGLE_LOADING});
export const setModalBody = (activeComponent) =>({type:SET_MODAL_BODY, activeComponent});