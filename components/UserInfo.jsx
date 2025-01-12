"use client";
import React, { useEffect, useState, useRef } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import cookie2 from "js-cookie";
import Cookies from "js-cookie";
import "jspdf-autotable";
import Image from "next/image";
import { handleFileChange } from "@jmacera/cloudinary-image-upload";
import Link from "next/link";

export default function UserInfo() {
  const { data: session } = useSession();
  const router = useRouter();
  const [workerSkills, setWorkerSkills] = useState([]);
  const [availableSkillSets, setAvailableSkillSets] = useState([]);
  const [missingSkillSets, setMissingSkillSets] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  // Add this to the state variables
  const [customSkill, setCustomSkill] = useState("");

  // Function to handle adding a custom skill
  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !workerSkills.includes(customSkill)) {
      setWorkerSkills([...workerSkills, customSkill]);
      setCustomSkill(""); // Clear the input field
      toast.success(`Skill "${customSkill}" added!`);
    } else {
      toast.error("Skill already exists or is invalid.");
    }
  };


  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both the worker skills and user data in parallel
        const [workerSkillsResponse, userDataResponse] = await Promise.all([
          fetch("/api/workerskills", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("/api/usersInfo", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              email: session?.user?.email,
            }),
          }),
        ]);

        const workerSkillsData = await workerSkillsResponse.json();
        const userData = await userDataResponse.json();

        if (workerSkillsData?.skills?.length > 0) {
          setAvailableSkillSets(workerSkillsData?.skills);
        }

        if (userData) {
          setUserInfo(userData);
          setImageUrl(userData?.imageUrl);
          setWorkerSkills(userData?.skillSets);

          // Only filter missing skills once both available skills and user skills are fetched
          const filteredMissingSkills = workerSkillsData?.skills.filter(
            (skill) => !userData?.skillSets?.includes(skill)
          );

          setMissingSkillSets(filteredMissingSkills);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Fetch both data sets concurrently
    fetchData();
  }, [session, token]);

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
        await updateUserImage(imageUrl);
      }
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };
  const updateUserImage = async (url) => {
    try {
      const response = await fetch('/api/update-image', {
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
  const addSkillSet = (skillSet) => {
    try {
      setMissingSkillSets(missingSkillSets.filter((missingSkillSet) => missingSkillSet !== skillSet));
      setWorkerSkills([...workerSkills, skillSet]);
    } catch (err) {
      console.error('Error setting skill set:', skillSet);
    }
  };
  const updateUserSkillSets = async () => {
    try {
      const response = await fetch('/api/updateSkillSet', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user?.email,
          skillSets: workerSkills,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        // Trigger a rerender if necessary
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error updating user skill set:', error);
      toast.error('Failed to update user skill set');
    }
  };
  const removeSkillSet = (skill) => {
    try {
      setWorkerSkills(workerSkills.filter((workerSkill) => workerSkill !== skill));
      setMissingSkillSets([...missingSkillSets, skill]);
    } catch (err) {
      console.error('Error removing skill set:', skill);
    }
  };
  const [showDropdown, setShowDropdown] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleEditToggle = () => {
    setEditMode((prevMode) => !prevMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const updateUserInfo = async () => {
    try {
      const { email, firstName, lastName, phoneNumber, facebook, homeAddress, yearsExperience, dailyRate, birthDate } = userInfo;
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user?.email,
          newEmail: email,
          firstName, lastName, phoneNumber, facebook, homeAddress, yearsExperience, dailyRate, birthDate,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        const userData = {
          email, firstName, lastName, phoneNumber, facebook, homeAddress, yearsExperience, dailyRate, birthDate,
        };
        setUserInfo(userData);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleSave = async () => {
    // Save changes logic (API call or state update)
    setEditMode(false);
    await updateUserInfo();
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <div className="flex pb-8 md:pb-0 md:pr-10 xl:pr-20 font-main text-xl md:text-3xl ">
        Welcome to Online Skilled Worker Booking System for Socorro
      </div>
      <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 lg:gap-6 w-full">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col text-md gap-2 my-6">
        <div className="font-main">
          Last Name:
          <span className="font-bold font-MyFont pl-3">
            {editMode ? (
              <input
                type="text"
                name="lastName"
                value={userInfo?.lastName}
                onChange={handleInputChange}
                className="border-b border-gray-300 focus:outline-none"
              />
            ) : (
              userInfo?.lastName
            )}
          </span>
        </div>
        <div className="font-main">
          First Name:
          <span className="font-bold font-MyFont pl-3">
            {editMode ? (
              <input
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleInputChange}
                className="border-b border-gray-300 focus:outline-none"
              />
            ) : (
              userInfo.firstName
            )}
          </span>
        </div>
        <div className="font-main">
          Email:
          <span className="font-bold font-MyFont pl-3">
            {editMode ? (
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                className="border-b border-gray-300 focus:outline-none"
              />
            ) : (
              userInfo.email
            )}
          </span>
        </div>
        <div className="font-main">
          Phone Number:
          <span className="font-bold font-MyFont pl-3">
            {editMode ? (
              <input
                type="text"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleInputChange}
                className="border-b border-gray-300 focus:outline-none"
              />
            ) : (
              userInfo.phoneNumber
            )}
          </span>
        </div>
        <div className="font-main">
          Facebook:
          {editMode ? (
            <div className="pl-3">
              <input
                type="text"
                name="facebook"
                value={userInfo.facebook}
                onChange={handleInputChange}
                className="border-b border-gray-300 focus:outline-none"
              />
            </div>
          ) : (
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
            {editMode ? (
              <input
                type="text"
                name="homeAddress"
                value={userInfo.homeAddress}
                onChange={handleInputChange}
                className="border-b border-gray-300 focus:outline-none"
              />
            ) : (
              userInfo.homeAddress
            )}
          </span>
        </div>
        <div className="font-main">
          Birth Date:
          <span className="font-bold font-MyFont pl-3">
            {editMode ? (
              <input
                type="date"
                name="birthDate"
                value={userInfo.birthDate}
                onChange={handleInputChange}
                className="border-b border-gray-300 focus:outline-none"
              />
            ) : (
              userInfo.birthDate
            )}
          </span>
        </div>
        {session?.user?.role === 'skilled-worker' && (
          <div className="font-main">
            Years of Experience:
            <span className="font-bold font-MyFont pl-3">
              {editMode ? (
                <input
                  type="number"
                  name="yearsExperience"
                  value={userInfo.yearsExperience}
                  onChange={handleInputChange}
                  className="border-b border-gray-300 focus:outline-none"
                />
              ) : (
                userInfo.yearsExperience
              )}
            </span>
          </div>
        )}
        {session?.user?.role === 'skilled-worker' && (
          <div className="font-main">
            Daily Rate:
            <span className="font-bold font-MyFont pl-3">
              {editMode ? (
                <input
                  type="text"
                  name="dailyRate"
                  value={userInfo.dailyRate}
                  onChange={handleInputChange}
                  className="border-b border-gray-300 focus:outline-none"
                />
              ) : (
                userInfo.dailyRate
              )}
            </span>
          </div>
        )}
        <div className="flex justify-around">
          {editMode ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white w-[150px] font-bold px-6 py-2 mt-3"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-blue-500 text-white w-[150px] font-bold px-6 py-2 mt-3"
            >
              Update
            </button>
          )}
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
      {session?.user?.role === "skilled-worker" && (
        <>
          <div className="flex pb-8 md:pb-0 md:pr-10 xl:pr-20 font-main text-xl md:text-3xl mt-8">
            Worker Skill Set
          </div>
          {workerSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 mb-4 flex items-center justify-between"
            >
              <Link href={`/worker/${userInfo._id}/skill/${skill}`}>
                <h2 className="text-xl font-bold mb-2">{skill}</h2>
                <img
                  src={`/icons/${skill}.png`}
                  alt={`${skill} Icon`}
                  width={50}
                  height={50}
                  onError={(e) => {
                    e.target.onerror = null; // Prevents infinite fallback loop
                    e.target.src = "/icons/custom.png"; // Replace with your fallback image path
                  }}
                />
              </Link>
              <button
                onClick={() => removeSkillSet(skill)}
                className="text-red-500 hover:text-red-700 transition duration-200"
                aria-label={`Remove ${skill}`}
              >
                ❌
              </button>
            </div>
          ))}
          <button
            onClick={() => updateUserSkillSets()}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Save
          </button>
          <br />
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Add Skill Set
          </button>
          {showDropdown && (
            <div>
              <div className="bg-white shadow-md rounded-lg p-4 mt-2">
              <h3 className="text-lg font-bold mb-2">Available Skills</h3>
              <ul>
                {missingSkillSets.map((skill, index) => (
                  <li key={index} className="py-1">
                    <button
                      onClick={() => {
                        addSkillSet(skill);
                      }}
                      className="text-blue-500"
                    >
                      {skill}
                    </button>
                  </li>
                ))}
              </ul>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4 mt-4">
              <h3 className="text-lg font-bold mb-2">Add Custom Skill</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  placeholder="Enter a custom skill"
                  className="border border-gray-300 rounded px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddCustomSkill}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
