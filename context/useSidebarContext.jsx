import React, { createContext, useContext, useReducer } from "react";
import { sidebarReducer } from "../reducers/sidebar/reducer";

const SidebarContext = createContext();
const DEFAULT = "Home"

export const useSidebarContext =()=>{
   const context = useContext(SidebarContext);
   if(context) return context;
   throw new Error("component should be wrapped with SidebarContextProvider");
}

const initState = {
    activeListItem:DEFAULT,
    width:""
}

export default function SidebarContextProvider({children}) {
    const [state, dispatch] = useReducer(sidebarReducer,initState);

    const value = [state, dispatch]
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}
