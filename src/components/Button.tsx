import type { ReactNode } from "react";
import { navigate } from "astro:transitions/client";

type Props = {
  clas?: string;
  to?: string;
  click?: () => void;
  children?: ReactNode;
};

export default function Button({ clas, to, click, children }: Props) {
  const handleClick = () => {
    click?.();
    if (to) navigate(to);
  };

  return (
    <button
      className={`cta_bttn ${clas ?? ""}`}
      type="submit"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
