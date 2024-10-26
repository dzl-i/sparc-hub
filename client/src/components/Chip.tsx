import { ReactNode } from "react";

export type ChipProps = {
  children?: ReactNode;
  variant: "default" | "landingPage" | "top3";
}

function Chip( { children, variant="default"}: ChipProps) {
  let styles = "px-4 py-1 text-black outline-0";
  switch(variant) {
    case "default":
      styles += "text-sm font-spartan bg-transparent rounded-3xl border border-black"
      break;
    case "landingPage":
      styles += "text-sm font-lalazar bg-white rounded-3xl border-2 border-[darkGreen]"
      break;
    case "top3":
      styles += "font-lalazar text-lg bg-white rounded-xl border border-black"
      break;
  }

  return (
    <>
      <div>
        <button
          type="button"
          className={styles}
          disabled
        >
          {children}
        </button>
      </div>
    </>
  );
}

export default Chip;
