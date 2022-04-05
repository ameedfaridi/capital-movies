import router from "next/router";
import React, { useEffect } from "react";
import Login from "../components/auth/Login";
import { useUIContext } from "../context/useUIContext";
import { toggleLoading } from "../reducers/ui/actions";

export default function Signin() {
  const [uiState, uiDispatch] = useUIContext();

  useEffect(() => {
    uiDispatch(toggleLoading());
    setTimeout(() => {
      const token = JSON.parse(localStorage.getItem("access_token"));
      if (!token) return uiDispatch(toggleLoading());
      
      uiDispatch(toggleLoading());
      router.replace("/discover");
    }, 2000);
  }, []);

  return <Login onLoginPage={true} />;
}
