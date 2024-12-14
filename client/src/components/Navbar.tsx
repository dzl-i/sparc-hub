"use client";

import { Handshake, CircleUserRound, LogIn, LogOut } from "lucide-react";
import Tooltip from "./Tooltip";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";

function Navbar() {
  const { user, logout, token } = useAuth();

  return (
    <div>
      <nav className="flex h-screen sticky top-0 justify-between flex-col bg-white py-4 w-20 shadow-lg">
        <ul className="flex flex-col items-center gap-5">
          <li>
            <Link href="/">
              {/* svg scales poorly, consider manually adjusting width and height */}
              <Image
                alt="Sparchub Icon"
                width={50}
                height={50}
                className="h-10 hover:scale-105 transition-transform cursor-pointer"
                src="/assets/tempIcon.svg"
              ></Image>
            </Link>
          </li>
          <hr className="w-9/12 size-0.5 bg-gray-200" />
        </ul>

        <ul className="flex flex-col items-center gap-8">
          <li>
            <Link href="/terms-and-conditions">
              <Tooltip message={"Terms & Conditions"}>
                <Handshake className="hover:scale-105 transition-transform cursor-pointer" />
              </Tooltip>
            </Link>
          </li>
          {user && (
            <li>
              <Link
                href={{
                  pathname: "/profile",
                  query: { token },
                }}
              >
                <Tooltip message={"View Profile"}>
                  <CircleUserRound className="hover:scale-105 transition-transform cursor-pointer" />
                </Tooltip>
              </Link>
            </li>
          )}
          <li>
            {user ? (
              <Link href="/">
                <Tooltip message={"Logout"}>
                  <LogOut
                    onClick={logout}
                    className="hover:scale-105 transition-transform cursor-pointer"
                  />
                </Tooltip>
              </Link>
            ) : (
              <Link href="/login">
                <Tooltip message={"Login"}>
                  <LogIn className="hover:scale-105 transition-transform cursor-pointer" />
                </Tooltip>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
