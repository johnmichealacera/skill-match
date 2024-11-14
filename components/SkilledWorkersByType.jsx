"use client";
import React from "react";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MutatingDots } from "react-loader-spinner";

export default function SkilledWorkersByType ({workerType}) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [loading, setloading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const resUsersByRole = await fetch("/api/workersByType", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ workerType }),
        });
        const { users: data } = await resUsersByRole.json();

        setBooks(data || []);
      } catch (error) {
        console.error("An error occurred:", error);
        setBooks([]);
      }
    };
    fetchBooks();
  }, [workerType]);

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <h1 className="font-main text-xl my-4 flex justify-center font-semibold mr-auto md:text-2xl ">
        {" "}
        Skilled Workers: {workerType.toUpperCase()}
      </h1>
      <div className="flex justify-center" >
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
        <Card participants={books} />
      )}
      </div>
    </div>
  );
};
