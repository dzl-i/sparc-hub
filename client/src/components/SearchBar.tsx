import { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";

type SearchBarProps = {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({ inputText, setInputText }: SearchBarProps) {
  const [localInput, setLocalInput] = useState(inputText);
  const filterDataDebounce = 100;

  // Debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setInputText(localInput);
    }, filterDataDebounce);
    return () => clearTimeout(timer);
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
