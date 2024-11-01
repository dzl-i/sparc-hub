import { ReactNode } from "react";

function Tooltip({ message, children }: { message: string, children: ReactNode }) {
  return (
    <div className="group relative flex group">
      {children}
      <span className="absolute scale-0 bg-white p-2 text-xs text-center shadow-xl text-black font-spartan rounded-md top-[-10px] left-[150%] group-hover:scale-100">
        {message}
      </span>
    </div>
  );
}

export default Tooltip;