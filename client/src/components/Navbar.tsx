import { Handshake, CircleUserRound, LogIn } from "lucide-react";

function Navbar() {
  return (
    <>
      <div className="flex bg-slate-600">
        <div className="flex h-screen justify-between flex-col bg-white py-4 w-20">
          <div className="flex flex-col items-center gap-5">
            <div>
              <img className="h-10 hover:scale-105 transition-transform cursor-pointer" src="/assets/tempIcon.svg"></img>
            </div>
            <hr className="w-9/12 size-0.5 bg-gray-200"/>
            <Handshake className="hover:scale-105 transition-transform cursor-pointer"></Handshake>
          </div>
          <div className="flex flex-col items-center gap-8">
            <CircleUserRound className="hover:scale-105 transition-transform cursor-pointer"></CircleUserRound>
            <LogIn className="hover:scale-105 transition-transform cursor-pointer"></LogIn>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;