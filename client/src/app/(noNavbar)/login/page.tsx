"use client";
import { useRouter } from "next/navigation";
import { createRipple } from "@/components/Button";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [zid, setZid] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const zidChecker = /^z\d{7}$/;
  const router = useRouter();

  const loginUser = async (loginData: { zid: string }) => {
    console.log(loginData);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const token = await response.json();

      login(String(token));
      return String(token);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

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
  }, [zid]);

  const submit = async (zid: string) => {
    let error = "";
    if (zid === "") {
      error = "Zid cannot be empty";
    } else if (!zid.match(zidChecker)) {
      error = "Zid incorrect format!";
    }

    setErrorMsg(error);
    if (error) return;

    try {
      setIsLoading(true);
      await loginUser({ zid });
      router.push("/");
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen w-screen justify-center items-center">
        <div className="flex flex-col w-[400px] bg-[#b7e6a5b0] p-9 rounded-lg shadow-2xl">
          <h1 className="text-center font-lalezar text-textGreen text-4xl mb-2">
            Welcome to SparcHub
          </h1>
          <form className="font-spartan">
            <div className="flex flex-col gap-5">
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
              {errorMsg && <p className="text-md text-red-800">{errorMsg}</p>}
              <button
                type="button"
                disabled={isLoading}
                className="rounded-lg text-lg bg-lightGreen border border-black h-10 font-semibold relative overflow-hidden hover:bg-lightGreen hover:brightness-95 disabled:opacity-50"
                onClick={async (e) => {
                  createRipple(e);
                  await submit(zid);
                }}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  className="text-md font-semibold underline"
                  onClick={() => router.push("/register")}
                >
                  No account? Register now!
                </button>
                <button
                  type="button"
                  className="text-md font-semibold underline"
                  onClick={handleGoBack}
                >
                  Back
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
