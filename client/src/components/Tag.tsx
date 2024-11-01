"use client";

import { ReactNode, useState } from "react";

function Tag( { children }: { children: ReactNode }) {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(true);
  }

  const handleUnselect = () => {
    setSelected(false);
  }

  return (
    <>
      <div>
        { selected ? (
        <button
          type="button"
          className="px-4 py-1 text-sm font-spartan bg-[hsl(85,49%,40%)] text-[hsl(50,21%,95%)] rounded-3xl border-[1.5px] border-[hsl(85,49%,40%)]"
          onClick={handleUnselect}
        >
          {children}
        </button>) :

        (<button
          type="button"
          className="px-4 py-1 text-sm font-spartan text-[hsl(30,9%,17%)] bg-[hsl(50,21%,95%)] rounded-3xl border-[1.5px] border-[hsl(30,9%,17%)]"
          onClick={handleSelect}
        >
          {children}
        </button>)}
      </div>
    </>
  )
}

export default Tag;