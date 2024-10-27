import { ReactNode } from "react";

export type ChipProps = {
  children?: ReactNode;
  variant: "default" | "landingPage" | "top3";
}

function Chip( { children, variant="default" }: ChipProps ) {
  let styles = "px-4 py-1 text-black text-center font-spartan w-full outline-0";
  switch(variant) {
    case "default":
      styles += "text-sm bg-transparent rounded-3xl border border-black"
      break;
    case "landingPage":
      styles += "text-sm font-semibold bg-white rounded-3xl border-2 border-[darkGreen]"
      break;
    case "top3":
      styles += "text-lg font-semibold bg-white rounded-xl border border-black"
      break;
  }

  return (
    <>
      <div className={styles}>
        {children}
      </div>
    </>
  );
}

export default Chip;
