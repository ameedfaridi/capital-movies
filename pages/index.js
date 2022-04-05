import { useEffect } from "react";
import router from "next/router";

export default function index() {
  useEffect(() => {
    router.push("/discover");
  }, []);
  return null;
}
