"use client";

import { Handshake, CircleUserRound, LogIn, LogOut } from "lucide-react";
import Tooltip from "./Tooltip";
import { useState } from "react";

function Navbar() {
  const [signedin, setSignedin] = useState(false);

  const handleSignin = () => {
    setSignedin(true);
  }

  const handleSignout = () => {
    setSignedin(false);
  }
  return (
    <div>
      <nav className="flex h-screen sticky top-0 justify-between flex-col bg-white py-4 w-20">
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
            { signedin ? (
            <Tooltip message={"Logout"}>
              <LogOut
                className="hover:scale-105 transition-transform cursor-pointer"
                onClick={handleSignout}
              />
            </Tooltip>) :

            (<Tooltip message={"Login"}>
              <LogIn
                className="hover:scale-105 transition-transform cursor-pointer"
                onClick={handleSignin}
              />
            </Tooltip>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;