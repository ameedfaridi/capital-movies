import React, { createContext, useContext, useReducer } from "react";
import { authReducer } from "../reducers/auth/reducer";


const AuthContext = createContext();

export const useAuthContext =()=>{
   const context = useContext(AuthContext);
   if(context) return context;
   throw new Error("component should be wrapped with AuthContextProvider");
}

const initState = {
    isLogin:false,
    username:"",
    email:"",
    favouriteMovies:[]
}


export default function AuthContextProvider({children}) {
    const [state, dispatch] = useReducer(authReducer,initState);

    const value = [state, dispatch];
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
