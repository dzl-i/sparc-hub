"use client";
import { useRouter } from "next/navigation";
import { createRipple } from "@/components/Button";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const [zid, setZid] = useState("");
  const [zpass, setZpass] = useState("");
  const [confirmZpass, setConfirmZpass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const zidChecker = /^z\d{7}$/;
  const router = useRouter();

  const handleGoBack = () => {
    const referrer = document.referrer;
    const isInternalReferrer = referrer.includes(window.location.hostname);

    if (window.history.length > 1 && isInternalReferrer) {
      router.back();
    } else {
      router.push("/");
    }
  };

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
    } else if (zpass.length < 10) {
      error = "zpass cannot be below 10 character";
    }

    setErrorMsg(error);
    if (error) return;

    // Not going to handle password
    // For demo will just allow people to
    console.log(zid);
    console.log(zpass);

    handleGoBack();
  };

  return (
    <>
      <div className="flex h-screen w-screen justify-center items-center">
        <div className="w-1/5 bg-[#b7e6a5b0] px-8 pt-6 pb-4 rounded-lg">
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
                className="rounded-lg text-lg bg-lightGreen border border-black h-10 font-semibold relative overflow-hidden"
                onClick={(e) => {
                  createRipple(e);
                  submit(zid, zpass);
                }}
              >
                Register
              </button>
              <button
                type="button"
                className="text-md font-semibold"
                onClick={handleGoBack}
              >
                Go back
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
