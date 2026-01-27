import { useLayoutEffect, useState } from "react";

export default function useWidth() {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize(); // set inicial
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
}
