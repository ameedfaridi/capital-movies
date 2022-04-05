import { useEffect, useState } from "react";

export default function useGetLocalStorageItem(initialProps, key, dep) {
    const [state, setState] = useState(initialProps);

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem(key));
        if (!item) return;
        setState(item);
      }, dep);
    
  return state;
}
