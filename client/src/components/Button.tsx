import { ReactNode } from "react";

function Button({ children }: { children: ReactNode }) {
  return(
    <>
      <div>
        <button type="button" className="px-10 py-2 text-lg font-semibold font-spartan text-[hsl(50,21%,95%)] bg-[hsl(30,9%,17%)] hover:bg-[hsl(0,0%,0%)] duration-200 rounded-3xl outline-0 border-0">
          {children}
        </button>
      </div>
    </>
  );
}
export default Button;