import { Handshake, CircleUserRound, LogIn, TableProperties } from "lucide-react";
import Tooltip from "./Tooltip";

function Navbar() {
  return (
    <div>
      <nav className="flex h-screen justify-between flex-col bg-white py-4 w-20">
        <ul className="flex flex-col items-center gap-5">
          <li>
            {/* svg scales poorly, consider manually adjusting width and height */}
            <img className="h-10 hover:scale-105 transition-transform cursor-pointer" src="/assets/tempIcon.svg"></img>
          </li>
          <hr className="w-9/12 size-0.5 bg-gray-200"/>
          <li>
            <Tooltip message={"Terms & Conditions"}>
              <Handshake className="hover:scale-105 transition-transform cursor-pointer"/>
            </Tooltip>
          </li>
        </ul>

        <ul className="flex flex-col items-center gap-8">
          <li>
            <Tooltip message={"View Profile"}>
              <CircleUserRound className="hover:scale-105 transition-transform cursor-pointer"/>
            </Tooltip>
          </li>
          <li>
            <Tooltip message={"Login"}>
              <LogIn className="hover:scale-105 transition-transform cursor-pointer"/>
            </Tooltip>
          </li>
        </ul>
      </nav>
    </div>


  );
}

export default Navbar;