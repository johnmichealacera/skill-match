"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UserProfileById({ id }) {
  const [workerSkills, setWorkerSkills] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [session, setSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState(''); // Feedback textarea state
  const [feedbackList, setFeedbackList] = useState([]); // Feedback list state
  const token = Cookies.get("token");

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
          setFeedbackList(data?.feedback || []); // Load existing feedback if available
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUserData();
    const fetchSession = async () => {
      const session = await fetchSessionData();
      setSession(session);
    };
    fetchSession();
  }, [id]);

  const handleHire = async () => {
    try {
      const response = await fetch("/api/hireWorker", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workerId: id,
          hireBy: session?.user?.email,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setUserInfo((prev) => ({
          ...prev,
          hireBy: session?.user?.email,
        }));
        toast.success("Worker hired successfully!");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error hiring worker:", error);
      alert("An error occurred while hiring the worker.");
    }

    setIsModalOpen(false);
  };

  const endWorkerContract = async () => {
    try {
      const response = await fetch("/api/endWorkerContract", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workerId: id,
          hireBy: session?.user?.email,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setUserInfo((prev) => ({
          ...prev,
          hireBy: null,
        }));
        toast.success("Worker contract ended successfully!");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error ending worker contract:", error);
      alert("An error occurred while ending the worker contract.");
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      const response = await fetch("/api/submitWorkerFeedback", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workerId: id,
          feedback,
        }),
      });

      if (response.ok) {
        const newFeedback = await response.json();
        setFeedbackList(newFeedback); // Add new feedback to the list
        setFeedback(''); // Clear the textarea
        toast.success("Feedback submitted successfully!");
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An error occurred while submitting feedback.");
    }
  };

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
          {session?.user?.role === 'employer' && (
            <div className="flex w-full">
              {userInfo?.hireBy ? (
                <p className="bg-red-400 flex-1 text-center">Unavailable</p>
              ) : (
                <p className="bg-green-400 flex-1 text-center">Available</p>
              )}
              {userInfo?.hireBy ? (
                userInfo?.hireBy === session?.user?.email ? (
                  <button className="bg-blue-400 flex-1 text-center" onClick={() => endWorkerContract(true)}>End Contract</button>
                ) : (
                  <p className="bg-blue-400 flex-1 text-center">Hired By {userInfo?.hireBy}</p>
                )
              ) : (
                <button
                  className="flex-1 text-center bg-blue-500 text-white"
                  onClick={() => setIsModalOpen(true)} // Open modal on button click
                >
                  Hire me
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Hire this skilled worker?</h2>
            <p className="mb-6">Are you sure you want to hire this worker?</p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)} // Close modal on cancel
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleHire} // Call hire function on confirmation
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {session?.user?.role === 'employer' && (
        <div className="mt-6">
          <h2 className="text-lg font-bold">Submit Feedback</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-3 border rounded-lg mt-2"
            rows="4"
            placeholder="Write your feedback here..."
          ></textarea>
          <button
            onClick={handleFeedbackSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Submit Feedback
          </button>
        </div>
      )}

      {/* Feedback Section */}
      {userInfo?.role === 'skilled-worker' && (
        <>
          <div className="flex pb-8 md:pb-0 md:pr-10 xl:pr-20 font-main text-xl md:text-3xl mt-8">
            Worker Skill Set
          </div>
          {workerSkills.map((skill, index) => (
            <Link href={`/worker/${userInfo._id}/skill/${skill}`} key={index}>
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

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Feedback</h2>
            {feedbackList.length > 0 ? (
              feedbackList.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border-b border-gray-200 bg-gray-100 rounded mb-2"
                >
                  {item}
                </div>
              ))
            ) : (
              <p>No feedback yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
