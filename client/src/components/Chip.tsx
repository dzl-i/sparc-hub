import { ReactNode } from "react";

export type ChipProps = {
  children?: ReactNode;
  variant: "default" | "landingPage" | "top3";
};

function Chip({ children, variant = "default" }: ChipProps) {
  let styles = "px-4 py-1 text-black text-center font-spartan outline-0";
  switch (variant) {
    case "default":
      styles += "bg-transparent rounded-3xl border border-black text-md";
      break;
    case "landingPage":
      styles +=
        "text-sm font-semibold bg-white rounded-3xl border-2 border-black w-full";
      break;
    case "top3":
      styles +=
        "text-lg font-semibold bg-white rounded-xl border-2 border-black w-full hover:bg-slate-100";
      break;
  }

  return (
    <>
      <div className={styles}>{children}</div>
    </>
  );
}

export default Chip;
