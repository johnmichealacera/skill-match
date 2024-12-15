"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { MutatingDots } from "react-loader-spinner";
import { handleFileChange } from "@jmacera/cloudinary-image-upload";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function SkilledWorkersByTypeView ({id, workerType}) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [loading, setloading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [skillSetImages, setSkillSetImages] = useState([]);
  const [session, setSession] = useState(null);

  async function fetchSessionData() {
    try {
      const response = await fetch('/api/session');
      if (!response.ok) {
        throw new Error('Failed to fetch session');
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch session:', error);
      throw new Error('Failed to fetch session');
    }
  }
  useEffect(() => {
    const fetchSession = async () => {
      const session = await fetchSessionData();
      setSession(session);
    };
    fetchSession();
    const fetchBooks = async () => {
      try {
        const resUsersByRole = await fetch("/api/workersImageByType", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        const { users: data } = await resUsersByRole.json();

        setUserInfo(data || []);
        const skillSetImage = data?.skillSetsImageByType?.find((item) => item?.skill === workerType);
        setSkillSetImages(skillSetImage?.images || []);
      } catch (error) {
        console.error("An error occurred:", error);
        setUserInfo([]);
      }
    };
    fetchBooks();
  }, [workerType]);

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
        await updateUserImageByType(imageUrl);

        // Update the `skillSetImages` state to reflect the new image
        setSkillSetImages((prevImages) => [...prevImages, imageUrl]);
      }
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };
  const updateUserImageByType = async (url) => {
    try {
      let newSkillSetsImage;
      const rawSkillSetsImageByType = userInfo?.skillSetsImageByType?.find((item) => item?.skill === workerType);
      if (rawSkillSetsImageByType) {
        if (rawSkillSetsImageByType?.images) {
          rawSkillSetsImageByType?.images?.push(url);
        } else {
          rawSkillSetsImageByType.images = [url];
        }
        newSkillSetsImage = userInfo?.skillSetsImageByType.map(item => {
          if (item.skill === workerType) {
            return {
              ...item, // Keep existing properties
              images: [...item.images, url] // Append new images
            };
          }
          return item; // Return other items unchanged
        });
      } else {
        userInfo?.skillSetsImageByType?.push({
          skill: workerType,
          images: [url]
        });
        newSkillSetsImage = userInfo?.skillSetsImageByType;
      }
      const response = await fetch('/api/updateWorkerImageByType', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInfo?.email,
          imageUrls: newSkillSetsImage,
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

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <h1 className="font-main text-xl my-4 flex justify-center font-semibold mr-auto md:text-2xl ">
        Name: {userInfo?.lastName}, {userInfo?.firstName}
      </h1>
      <h1 className="font-main text-xl my-4 flex justify-center font-semibold mr-auto md:text-2xl ">
        Skill: {workerType.toUpperCase()}
      </h1>
      <div className="" >
      {loading ? (
        <MutatingDots
          height="100"
          width="100"
          color="#ff0000"
          secondaryColor="#ff0000"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
      <div
      className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      {skillSetImages?.map((participant, index) => (
        <div
          key={index}
          className="flex flex-col justify-between rounded border-2 border-bggray align-baseline"
        >
          <div className="p-4 cursor-pointer bg-bggray">
            {/* Image container with fixed aspect ratio */}
            <div className="relative w-full h-40 sm:h-64 md:h-72 lg:h-80 overflow-hidden rounded-md">
              <Image
                src={participant || "/creation1.png"}
                priority="high"
                unoptimized={true}
                className="absolute object-cover w-full h-full"
                fill
                alt="Picture of the participant"
                onError={(e) => {
                  e.target.src = "/creation1.png";
                }}
              />
            </div>
          </div>
        </div>
        ))}
      </div>
      )}
      </div>
      {session?.user?.email === userInfo?.email && (<div className="content px-4 py-4 flex flex-col justify-between">
        <button
          onClick={handleButtonClick}
          className="bg-textgray justify-center px-2 py-2 font-MyFont text-primary flex-1 rounded md:px-4 text-sm font-semibold"
        >
          Upload Skill Image
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleMediaChange}
          className="hidden"
        />
      </div>
      )}
    </div>
  );
};
