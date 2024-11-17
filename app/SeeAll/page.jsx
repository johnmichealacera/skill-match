"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import { useSearchParams } from "next/navigation";
import { MutatingDots } from "react-loader-spinner";

const SeeAll = () => {
  const searchParams = useSearchParams();
  const result = 40;
  const heading = searchParams.get("heading");
  const order = searchParams.get("order");
  const title = searchParams.get("title");
  const [loading, setloading] = useState(false);
  const [books, setBooks] = useState([]);
  const [workerSkills, setWorkerSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(""); // State to track selected skill type
  const [filteredBooks, setFilteredBooks] = useState([]); // State to store filtered list

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both the worker skills and user data in parallel
        const [workerSkillsResponse, resUsersByRole] = await Promise.all([
          fetch("/api/workerskills", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }),
          fetch("/api/usersByRole", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: heading }),
          }),
        ]);

        const workerSkillsData = await workerSkillsResponse.json();
        setWorkerSkills(workerSkillsData?.skills || []);
        const { user: data } = await resUsersByRole.json();
        setBooks(data || []);
        setFilteredBooks(data || []); // Set the initial filtered list to all users
        setloading(false);
      } catch (error) {
        console.error("Error:", error);
        setBooks([]);
        setFilteredBooks([]);
      }
    };

    // Fetch both data sets concurrently
    fetchData();
  }, [heading]);
  // Handle dropdown selection and filter the books by selected skill
  const handleSkillChange = (e) => {
    const skill = e.target.value;
    setSelectedSkill(skill);
    if (skill) {
      const filtered = books.filter((user) =>
        user.skillSets?.includes(skill)
      );
      setFilteredBooks(filtered);
    } else {
      // If no skill selected, show all users
      setFilteredBooks(books);
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <h1 className="font-main text-xl my-4 flex justify-center font-semibold mr-auto md:text-2xl">
        {title}
      </h1>
      {/* Dropdown for skill types filter */}
      { title === 'Skilled Worker' && (
      <div className="flex justify-center mb-4">
        <label htmlFor="skillFilter" className="mr-2 font-main text-lg">
          Filter by Skill:
        </label>
        <select
          id="skillFilter"
          value={selectedSkill}
          onChange={handleSkillChange}
          className="p-2 border rounded-md text-gray-700"
        >
          <option value="">All Skills</option>
          {workerSkills?.map((skill, index) => (
            <option key={index} value={skill}>
              {skill.charAt(0).toUpperCase() + skill.slice(1)}
            </option>
          ))}
        </select>
      </div>
      )}
      <div className="flex justify-center">
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
          <Card participants={filteredBooks} />
        )}
      </div>
    </div>
  );
};

export default SeeAll;
