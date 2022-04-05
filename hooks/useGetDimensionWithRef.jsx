import { useEffect, useState } from "react";

export default function useGetDimentationsByRef(props) {

  const [height, setHeight] = useState(props.initialHeight ||
    process.browser &&
      process.browser.innerHeight *
        ((process.browser && process.browser.visualViewport?.scale) || 1)
  );
  const [width, setWidth] = useState(props.initialWidth ||
    process.browser &&
      process.browser.innerWidth *
        ((process.browser && process.browser.visualViewport?.scale) || 1)
  );

  useEffect(() => {
    if (process.browser) {
        if (!props?.givenRef || !props.givenRef?.current) return;
        setWidth(props.givenRef.current.clientWidth);
        setHeight(props.givenRef.current.clientHeight);
    }
  }, []);

  return [width, height];
}
