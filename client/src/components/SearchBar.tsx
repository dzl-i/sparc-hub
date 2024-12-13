import { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { DebouncedFunc } from "lodash";

type SearchBarProps = {
  inputText: string;
  setInputText: DebouncedFunc<(text: string) => void>;
};

function SearchBar({ inputText, setInputText }: SearchBarProps) {
  const [localInput, setLocalInput] = useState(inputText);

  useEffect(() => {
    setInputText(localInput);
  }, [localInput, setInputText]);

  return (
    <>
      <div className="relative w-full">
        <input
          className="bg-[hsl(0,0%,93%)] text-lg rounded border-2 border-black w-full h-10 pl-10 font-spartan leading-tight focus:outline-none focus:bg-[hsl(0,0%,98%)] focus:border-[darkGreen]"
          placeholder="Search..."
          type="text"
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </>
  );
}

export default SearchBar;
