"use client";
import { useRouter } from "next/navigation";
import { createRipple } from "@/components/Button";
import { useEffect, useState } from "react";
import { zidChecker, passwordRegex } from "@/constants";

export default function RegisterPage() {
  const [zid, setZid] = useState("");
  const [zpass, setZpass] = useState("");
  const [confirmZpass, setConfirmZpass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  useEffect(() => {
    setErrorMsg("");
  }, [zid, zpass, confirmZpass]);

  const submit = (zid: string, zpass: string) => {
    let error = "";
    if (zid === "") {
      error = "Zid cannot be empty";
    } else if (zpass === "") {
      error = "zpass cannot be empty";
    } else if (confirmZpass === "") {
      error = "confirm password cannot be empty";
    } else if (zpass != confirmZpass) {
      error = "passwords do not match";
    } else if (!zid.match(zidChecker)) {
      error = "Zid incorrect format!";
    } else if (!zpass.match(passwordRegex)) {
      error =
        "password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
    }

    setErrorMsg(error);
    if (error) return;

    // send register request
    console.log(zid);
    console.log(zpass);

    router.push("/login");
  };

  return (
    <>
      <div className="flex h-screen w-screen justify-center items-center">
        <div className="flex flex-col w-[400px] bg-[#b7e6a5b0] p-9 rounded-lg shadow-2xl">
          <h1 className="text-center font-lalezar text-textGreen text-4xl mb-2">
            Register
          </h1>
          <form className="font-spartan">
            <div className="flex flex-col gap-4">
              <div>
                <label
                  className="block text-lg font-spartan font-bold mb-2"
                  htmlFor="zid"
                >
                  Zid
                </label>
                <input
                  className="w-full py-2 px-2 rounded bg-slate-100 border-black border leading-tight focus:outline-none focus:shadow-outline"
                  id="zid"
                  placeholder="z1234567"
                  type="text"
                  value={zid}
                  onChange={(e) => setZid(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-lg font-spartan font-bold mb-2"
                  htmlFor="zpass"
                >
                  Password
                </label>
                <input
                  className="w-full py-2 px-2 rounded bg-slate-100 border-black border leading-tight focus:outline-none focus:shadow-outline"
                  id="zpass"
                  placeholder="zpass"
                  type="password"
                  value={zpass}
                  onChange={(e) => setZpass(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-lg font-spartan font-bold mb-2"
                  htmlFor="zpass"
                >
                  Confirm Password
                </label>
                <input
                  className="w-full py-2 px-2 rounded bg-slate-100 border-black border leading-tight focus:outline-none focus:shadow-outline"
                  id="zpass"
                  placeholder="zpass"
                  type="password"
                  value={confirmZpass}
                  onChange={(e) => setConfirmZpass(e.target.value)}
                />
              </div>
              {errorMsg && <p className="text-md text-red-800">{errorMsg}</p>}
              <button
                type="button"
                className="rounded-lg text-lg bg-lightGreen border border-black h-10 font-semibold relative overflow-hidden hover:bg-lightGreen hover:brightness-95	"
                onClick={(e) => {
                  createRipple(e);
                  submit(zid, zpass);
                }}
              >
                Register
              </button>
              <button
                type="button"
                className="text-md font-semibold underline"
                onClick={() => router.push("/login")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
