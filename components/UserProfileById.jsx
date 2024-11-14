"use client";
import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";

export default function UserProfileById({ id }) {
  const [workerSkills, setWorkerSkills] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/usersInfoById", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id,
          }),
        });
        const data = await response.json();

        if (data) {
          setUserInfo(data);
          setImageUrl(data?.imageUrl);
          setWorkerSkills(data?.skillSets);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUserData();
  }, [id]);

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <div className="text-center font-main text-xl md:text-3xl">
        {userInfo?.role?.toUpperCase()} PROFILE
      </div>
      <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 lg:gap-6 w-full">
        <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col  text-md gap-2 my-6">
          <div className="font-main ">
            Last Name:{" "}
            <span className="font-bold font-MyFont pl-3">
              {userInfo?.lastName}
            </span>
          </div>
          <div className="font-main ">
            First Name:{" "}
            <span className="font-bold font-MyFont pl-3">
              {userInfo?.firstName}
            </span>
          </div>
          <div className="font-main">
            Email:{" "}
            <span className="font-bold font-MyFont pl-3">
              {userInfo?.email}
            </span>
          </div>
          <div className="font-main">
          Phone Number:
          <span className="font-bold font-MyFont pl-3">
            {userInfo?.phoneNumber}
          </span>
        </div>
        <div className="font-main">
          Home Address:
          <span className="font-bold font-MyFont pl-3">
            {userInfo.homeAddress}
          </span>
        </div>
          <div className="content py-4 flex flex-col justify-between">
            {/* <button
              // onClick={handleButtonClick}
              className="bg-textgray justify-center px-2 py-2 font-MyFont text-primary flex-1 rounded md:px-4 text-sm font-semibold"
            >
              Message
            </button> */}
          </div>
        </div>
        <div
            className="flex flex-col justify-between rounded border-2 border-bggray align-baseline"
          >
            <div
              className="p-4 sm:p-8 md:p-4 lg:p-8 cursor-pointer bg-bggray"
            >
              <Image
                src={imageUrl || "/creation1.png"}
                priority="high"
                unoptimized={true} // {false} | {true}
                className="object-cover w-full h-full"
                width={500}
                height={500}
                alt="Picture of the author"
                onError={(e) => {
                  e.target.src = "/creation1.png";
                }}
              />
            </div>
        </div>
      </div>
      {userInfo?.role === 'skilled-worker' && (
        <>
          <div className="flex pb-8 md:pb-0 md:pr-10 xl:pr-20 font-main text-xl md:text-3xl mt-8">
            Worker Skill Set
          </div>
          {workerSkills.map((skill, index) => (
            <Link href={`/SkillWorkers/${encodeURIComponent(skill)}/view`}>
              <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-4">
                <h2 className="text-xl font-bold mb-2">{skill}</h2>
                <img
                  src={`/icons/${skill}.png`}
                  alt={`${skill} Icon`}
                  width={50}
                  height={50}
                />
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
