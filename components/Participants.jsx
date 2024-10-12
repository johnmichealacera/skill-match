"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "../components/Card";
import { IoIosArrowForward } from "react-icons/io";
import { useSession } from "next-auth/react";

export default function Participants ({ heading, order, title, result }) {
  const [participants, setParticipants] = useState([]);
  const { data: session } = useSession();
  const [error, setError] = useState("");

  const queryParams = {
    heading,
    order,
    title,
  };

  useEffect(() => {
    const fetchParticipants = async () => {
      if (!heading) {
        setError("Heading is necessary.");
        return;
      }
      try {
        const resUsersByRole = await fetch("api/usersByRole", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: heading }),
        });
        const { user: data } = await resUsersByRole.json();

        setParticipants(data || []);
        setError(null);
      } catch (error) {
        console.error("An error occurred:", error);
        setParticipants([]);
      }
    };
    fetchParticipants();
  }, [heading]);

  return (
    <div id="books" className="pt-14">
      <section className="mx-auto max-w-6xl px-4 py-6 md:px-8">
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

        <Card participants={participants} />

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
      </section>
    </div>
  );
};
