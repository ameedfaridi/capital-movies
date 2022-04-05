import { SET_EMAIL, SET_USERNAME, TOGGLE_LOGIN } from "./constants";

export const toggleLogin = ()=>({type:TOGGLE_LOGIN});
export const setUsername = (username)=>({type:SET_USERNAME, username});
export const setEmail = (email)=>({type:SET_EMAIL, email});