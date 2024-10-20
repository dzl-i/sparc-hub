import { SearchIcon } from "lucide-react";

function SearchBar() {
  return (
    <>
      <div className="relative w-full">
        <input
          className="bg-[hsl(0,0%,93%)] text-lg rounded border-2 border-black w-full h-10 pl-10 font-spartan leading-tight focus:outline-none focus:bg-[hsl(0,0%,98%)] focus:border-[darkGreen]"
          placeholder="Search..."
          type="text"
        />
        <SearchIcon
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
      </div>
    </>
  );
}

export default SearchBar;
