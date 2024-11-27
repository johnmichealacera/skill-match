"use client";
import React, { useEffect, useState } from "react";
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
          body: JSON.stringify({ id }),
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
        <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col text-md gap-2 my-6">
          <div className="font-main">
            Last Name:{" "}
            <span className="font-bold font-MyFont pl-3">
              {userInfo?.lastName}
            </span>
          </div>
          <div className="font-main">
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
            Facebook Profile:
            {userInfo.facebook && (
            <a
              href={userInfo.facebook}
              target="_blank"
              className="font-bold font-MyFont pl-3 hover:underline hover:text-blue-700 transition duration-200"
            >
              Visit my account
            </a>
            )}
          </div>
          <div className="font-main">
            Home Address:
            <span className="font-bold font-MyFont pl-3">
              {userInfo.homeAddress}
            </span>
          </div>
          <div className="font-main">
            Birth Date:
            <span className="font-bold font-MyFont pl-3">
              {userInfo.birthDate}
            </span>
          </div>
          {userInfo?.role === 'skilled-worker' && (
            <div className="font-main">
              Years of Experience:
              <span className="font-bold font-MyFont pl-3">
                {userInfo.yearsExperience} years
              </span>
            </div>
          )}
          {userInfo?.role === 'skilled-worker' && (
            <div className="font-main">
              Daily Rate:
              <span className="font-bold font-MyFont pl-3">
                {userInfo.dailyRate}
              </span>
            </div>
          )}
        </div>

        {/* Image Section with Fixed Aspect Ratio */}
        <div className="flex flex-col justify-between rounded border-2 border-bggray align-baseline min-h-[500px]">
          <div className="relative w-full min-h-[500px] h-full overflow-hidden rounded-md bg-bggray">
            <Image
              src={imageUrl || "/creation1.png"}
              priority="high"
              unoptimized={true}
              className="absolute object-cover w-full h-full"
              fill
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
            <Link key={index} href={`/SkillWorkers/${encodeURIComponent(skill)}/view`}>
              <div className="bg-white shadow-md rounded-lg p-6 mb-4">
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
