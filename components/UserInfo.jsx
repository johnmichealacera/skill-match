"use client";
import React, { useEffect, useState, useRef } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import cookie2 from "js-cookie";
import Cookies from "js-cookie";
import { MdCarpenter } from "react-icons/md";
import "jspdf-autotable";
import Image from "next/image";
import { handleFileChange } from "@jmacera/cloudinary-image-upload";

export default function UserInfo() {
  const { data: session } = useSession();
  const router = useRouter();
  const [workerSkills, setWorkerSkills] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [imageUrl, setImageUrl] = useState('');

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchWorkerSkills = async () => {
      try {
        const response = await fetch("/api/workerskills", {
          method:"POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body:JSON.stringify({
            email: session?.user?.email,
          }),
        });
        const data = await response.json();
        if (data.user?.skills?.length > 0) {
          setWorkerSkills(data.user?.skills);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/usersInfo", {
          method:"POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body:JSON.stringify({
            email: session?.user?.email,
          }),
        });
        const data = await response.json();
        console.log('user data', data);
        if (data) {
          setUserInfo(data);
          setImageUrl(data?.imageUrl);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchWorkerSkills();
    fetchUserData();
  }, [session]);
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const handleMediaChange = async (e) => {
    const file = e.target.files[0];

    try {
      const imageUrl = await handleFileChange(cloudinaryUrl, uploadPreset, apiKey, file)
      if (imageUrl) {
        setImageUrl(imageUrl);
        await updateUserProfile(imageUrl);
      }
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };
  const updateUserProfile = async (url) => {
    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user?.email,
          imageUrl: url,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };
  const [showDropdown, setShowDropdown] = useState(false);
  const [missingSkills, setMissingSkills] = useState([]);

  // Define all available skills
  const allSkills = ['farming', 'welding', 'carpentry', 'fishing', 'masonry', 'others'];

  // Determine missing skills
  useEffect(() => {
    const getMissingSkills = () => {
      const missing = allSkills.filter(skill => !workerSkills.includes(skill));
      setMissingSkills(missing);
    };

    getMissingSkills();
  }, [workerSkills]);

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <div className="flex pb-8 md:pb-0 md:pr-10 xl:pr-20 font-main text-xl md:text-3xl ">
        Welcome to Online Skilled Worker Booking System for Socorro
      </div>
      <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 lg:gap-6 w-full">
        <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col  text-md gap-2 my-6">
          <div className="font-main ">
            Last Name:{" "}
            <span className="font-bold font-MyFont pl-3">
              {session?.user?.lastName}
            </span>
          </div>
          <div className="font-main ">
            First Name:{" "}
            <span className="font-bold font-MyFont pl-3">
              {session?.user?.firstName}
            </span>
          </div>
          <div className="font-main">
            Email:{" "}
            <span className="font-bold font-MyFont pl-3">
              {session?.user?.email}
            </span>
          </div>
          <button
            onClick={() => {
              toast.success("Logout successfully");
              signOut();
              cookie2.remove("user");
              cookie2.remove("token");
              router.push("/");
            }}
            className="bg-red-500 text-white w-[150px] font-bold px-6 py-2 mt-3"
          >
            Log Out
          </button>
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
            <div className="content px-4 py-4 flex flex-col justify-between">
              <button
                onClick={handleButtonClick}
                className="bg-textgray justify-center px-2 py-2 font-MyFont text-primary flex-1 rounded md:px-4 text-sm font-semibold"
              >
                Replace Profile
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleMediaChange}
                className="hidden"
              />
            </div>
        </div>
      </div>
      {session?.user?.role === 'skilled-worker' && (
        <>
          <div className="flex pb-8 md:pb-0 md:pr-10 xl:pr-20 font-main text-xl md:text-3xl mt-8">
            Worker Skill Set
          </div>
          {workerSkills.map((skill, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-4">
              <h2 className="text-xl font-bold mb-2">{skill}</h2>
              <MdCarpenter className="ml-2" />
            </div>
          ))}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Add Skill Set
          </button>
          {showDropdown && (
            <div className="bg-white shadow-md rounded-lg p-4 mt-2">
              <h3 className="text-lg font-bold mb-2">Available Skills</h3>
              <ul>
                {missingSkills.map((skill, index) => (
                  <li key={index} className="py-1">
                    <button
                      onClick={() => {
                        // Handle skill addition here
                        // e.g., addSkill(skill);
                      }}
                      className="text-blue-500"
                    >
                      {skill}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
