"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "../components/Card";
import { IoIosArrowForward } from "react-icons/io";
import { useSession } from "next-auth/react";

export default function Participants({ heading, order, title, result }) {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [skillSets, setSkillSets] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("All");
  const { data: session } = useSession();
  const [error, setError] = useState("");

  const queryParams = {
    heading,
    order,
    title,
  };

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
          fetch("api/usersByRole", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: heading }),
          }),
        ]);
        const workerSkillsData = await workerSkillsResponse.json();
        const { user: data } = await resUsersByRole.json();
        setParticipants(data);
        setFilteredParticipants(data); // Initially show all participants
        // Extract unique skill sets
        setSkillSets(["All", ...workerSkillsData?.skills]);
      } catch (error) {
        console.error("Error:", error);
        setBooks([]);
        setFilteredBooks([]);
      }
    };

    // Fetch both data sets concurrently
    fetchData();
  }, [heading]);
  const handleSkillFilter = (skill) => {
    setSelectedSkill(skill);
    if (skill === "All") {
      setFilteredParticipants(participants);
    } else {
      const filtered = participants.filter((participant) =>
        participant.skillSets?.includes(skill)
      );
      setFilteredParticipants(filtered);
    }
  };

  return (
    <div id="books" className="pt-14">
      <section className="mx-auto max-w-6xl px-4 py-6 md:px-8 flex">
        {/* Skill Buttons */}
        {heading !== "employer" && (
          <aside className="flex-shrink-0 pr-4">
            {skillSets.map((skill, index) => (
              <button
                key={index}
                className={`block w-full p-2 mb-2 text-left rounded-lg ${
                  selectedSkill === skill
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleSkillFilter(skill)}
              >
                {skill.charAt(0).toUpperCase() + skill.slice(1)}
              </button>
            ))}
          </aside>
        )}

        {/* Main Content */}
        <div className="flex-grow">
          <div className="flex items-baseline justify-between">
            <h2 className="font-main text-2xl font-medium md:text-2xl">
              {title}
            </h2>
            <Link
              className="hidden md:flex items-center font-MyFont font-medium"
              href={{
                pathname: "/SeeAll",
                query: queryParams,
              }}
            >
              See All
              <IoIosArrowForward className="ml-2" />
            </Link>
          </div>

          <Card participants={filteredParticipants} />

          <div className="mt-8 flex items-center justify-center md:hidden">
            <Link
              className="flex items-center font-MyFont font-medium"
              href={{
                pathname: "/SeeAll",
                query: queryParams,
              }}
            >
              See All
              <IoIosArrowForward className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
