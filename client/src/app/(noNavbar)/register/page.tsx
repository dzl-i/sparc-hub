"use client";
import { useRouter } from "next/navigation";
import { createRipple } from "@/components/Button";
import { useEffect, useState } from "react";
import { zidChecker, passwordRegex } from "@/constants";
import DropdownSelect from "@/components/DropdownSelect";

export default function RegisterPage() {
  const [zid, setZid] = useState("");
  const [zpass, setZpass] = useState("");
  const [confirmZpass, setConfirmZpass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const yearData = [
    { id: "1", name: "Year 1" },
    { id: "2", name: "Year 2" },
    { id: "3", name: "Year 3" },
    { id: "4", name: "Year 4" },
    { id: "5", name: "Year 5" },
    { id: "6", name: "Year 6" },
  ];

  const degreeData = [
    { id: "COMM", name: "Commerce" },
    { id: "COMPSCI", name: "Computer Science" },
    { id: "SENG", name: "Software Engineering" },
    { id: "PSYCH", name: "Psychology" },
    { id: "ACTUARIAL", name: "Actuarial Studies" },
    { id: "MECH", name: "Mechanical Engineering" },
    { id: "ELEC", name: "Electrical Engineering" },
    { id: "MED", name: "Medicine" },
    { id: "LAW", name: "Law" },
    { id: "ARTS", name: "Arts" },
    { id: "SCIENCE", name: "Science" },
  ];

  const registerUser = async (registerData: {
    zid: string;
    degree: string;
    year: number;
  }) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setErrorMsg("");
  }, [zid, zpass, confirmZpass]);

  const submit = async (zid: string) => {
    let error = "";
    // if (zid === "") {
    //   error = "Zid cannot be empty";
    // } else if (zpass === "") {
    //   error = "zpass cannot be empty";
    // } else if (confirmZpass === "") {
    //   error = "confirm password cannot be empty";
    // } else if (zpass != confirmZpass) {
    //   error = "passwords do not match";
    // } else if (!zid.match(zidChecker)) {
    //   error = "Zid incorrect format!";
    // } else if (!zpass.match(passwordRegex)) {
    //   error = "password must be at least 8 characters long...";
    // } else if (!selectedYear) {
    //   error = "Please select your year of study";
    // } else if (!selectedDegree) {
    //   error = "Please select your degree";
    // }

    if (zid === "") {
      error = "Zid cannot be empty";
    } else if (!zid.match(zidChecker)) {
      error = "Zid incorrect format!";
    } else if (!selectedYear) {
      error = "Please select your year of study";
    } else if (!selectedDegree) {
      error = "Please select your degree";
    }

    setErrorMsg(error);
    if (error) return;

    // send register request with additional data
    try {
      // Call the register API
      await registerUser({
        zid,
        degree: selectedDegree,
        year: parseInt(selectedYear), // Convert year to number
      });

      // If successful, redirect to login
      router.push("/login");
    } catch (error: any) {
      setErrorMsg(error.message);
    }
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
              {/* ZID Input */}
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

              {/* Year Dropdown */}
              <div>
                <label className="block text-lg font-spartan font-bold mb-2">
                  Year of Study
                </label>
                <DropdownSelect
                  id="year-select"
                  title="Select Year"
                  data={yearData}
                  selectedId={selectedYear}
                  onSelect={setSelectedYear}
                  width="100%"
                />
              </div>

              {/* Degree Dropdown */}
              <div>
                <label className="block text-lg font-spartan font-bold mb-2">
                  Degree
                </label>
                <DropdownSelect
                  id="degree-select"
                  title="Select Degree"
                  data={degreeData}
                  selectedId={selectedDegree}
                  onSelect={setSelectedDegree}
                  width="100%"
                />
              </div>

              {/* Password Input */}
              {/* <div>
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
              </div> */}

              {/* Confirm Password Input */}
              {/* <div>
                <label
                  className="block text-lg font-spartan font-bold mb-2"
                  htmlFor="confirm-zpass"
                >
                  Confirm Password
                </label>
                <input
                  className="w-full py-2 px-2 rounded bg-slate-100 border-black border leading-tight focus:outline-none focus:shadow-outline"
                  id="confirm-zpass"
                  placeholder="Confirm password"
                  type="password"
                  value={confirmZpass}
                  onChange={(e) => setConfirmZpass(e.target.value)}
                />
              </div> */}

              {/* Error Message */}
              {errorMsg && <p className="text-md text-red-800">{errorMsg}</p>}

              {/* Register Button */}
              <button
                type="button"
                className="rounded-lg text-lg bg-lightGreen border border-black h-10 font-semibold relative overflow-hidden hover:bg-lightGreen hover:brightness-95"
                onClick={async (e) => {
                  createRipple(e);
                  await submit(zid);
                }}
              >
                {loading ? "Registering..." : "Register"}
              </button>

              {/* Back Button */}
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
