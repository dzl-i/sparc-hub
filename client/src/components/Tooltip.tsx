import { ReactNode } from "react";

function Tooltip({ message, children }: { message: string, children: ReactNode }) {
  return (
    <div className="group relative flex group">
      {children}
      <span className="absolute w-max scale-0 bg-white p-2 text-xs text-center shadow-xl text-black font-spartan font-bold rounded-md top-[-5px] left-[150%] group-hover:scale-100">
        {message}
      </span>
    </div>
  );
}

export default Tooltip;