import React, { createContext, useContext, useReducer } from "react";
import Login from '../components/auth/Login'
import { uiReducer } from "../reducers/ui/reducer";

const UIContext = createContext();
const DEFAULT = <Login />

export const useUIContext =()=>{
   const context = useContext(UIContext);
   if(context) return context;
   throw new Error("component should be wrapped with UIContextProvider");
}

const initState = {
    isModalOpen:false,
    activeComponent:DEFAULT,
    isLoading:false,
}


export default function UIContextProvider({children}) {
    const [state, dispatch] = useReducer(uiReducer,initState);

    const value = [state, dispatch];
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
