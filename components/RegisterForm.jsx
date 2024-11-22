"use client";
import React from 'react';
import Link from "next/link";
import { RiSendPlaneLine } from "react-icons/ri";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [facebook, setFacebook] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [birthDate, setBirthdate] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || (!email && !phoneNumber) || !password || !role) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = email ? await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }) : await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: phoneNumber }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          facebook,
          homeAddress,
          birthDate,
          yearsExperience,
          dailyRate,
          password,
          role,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        toast.success("Registered successfully");
        router.push("/login");
      } else {
        console.error("User registration failed.");
      }
    } catch (error) {
      console.error("Error during registration: ", error.method, " " + error.message);
      toast.error("Registration error", error);
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
    <h1 className="font-main text-xl my-4 font-semibold mr-auto md:text-2xl ">
      {" "}
    Register 
    </h1>
    <div className="md:divide-x flex flex-col md:flex-row ">
      <div className="flex pb-3 md:pb-0 md:pr-10 xl:pr-20 font-main text-xl md:text-3xl ">
        Welcome to <br className="hidden lg:flex pt-2"></br> The Website
      </div>
      <div className="flex-1 pt-8 md:pt-0 md:pl-10 xl:pl-20">
        <h2 className="text-xl mb-2 font-MyFont font-bold">Register Now!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
            First Name
              <input
                placeholder="Enter Your First Name"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="text"
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
            Last Name
              <input
                placeholder="Enter Your Last Name"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="text"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
              Email Address
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Valid Email"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="email"
                name="email"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
              Phone Number
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Your Phone Number"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="text"
                name="phone-number"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
              Facebook Username
              <input
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="Enter Your Facebook Username"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="text"
                name="home-address"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
              Home Address
              <input
                onChange={(e) => setHomeAddress(e.target.value)}
                placeholder="Enter Your Home Address"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="text"
                name="home-address"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
              Birth Date
              <input
                onChange={(e) => setBirthdate(e.target.value)}
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="date"
                name="birthdate"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
              Years of Experience
              <input
                onChange={(e) => setYearsExperience(e.target.value)}
                placeholder="Enter years of experience"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="number"
                name="home-address"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
              Preferred Rate Daily
              <input
                onChange={(e) => setDailyRate(e.target.value)}
                placeholder="Enter Your Daily Rate"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="number"
                name="home-address"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
              Password
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="password"
                name="password"
              />
            </label>
          </div>
          <div className="mb-4">
            <select
              onChange={(e) => setRole(e.target.value)}
              id="role"
              name="role"
              placeholder="Select role"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            >
              <option value="">Select role...</option>
              <option value="employer">Employer</option>
              <option value="skilled-worker">Skilled Worker</option>
            </select>
          </div>
          <button
            className="bg-textgray text-white w-full flex justify-center py-2 px-2 mt-2 font-MyFont text-lg font-medium md:rounded md:py-1"
          >
            <RiSendPlaneLine className="mt-1 text-white mr-3" />
            <span>Register</span>
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
            )}
          <div className="text-lg mt-3 flex justify-end text-right" >
          Already have an account? <Link href={"/login"}> <span className="underline pl-2">Login Now!</span></Link>
          </div>
        </form>
      </div>
    </div>
  </div>
);
}
