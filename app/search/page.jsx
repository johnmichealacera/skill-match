"use client";
import { BiSearch } from "react-icons/bi";
import React, { useState } from "react";
import Card from "@/components/Card";
import { MutatingDots } from "react-loader-spinner";
import Link from "next/link";
import { useSession } from "next-auth/react";


export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setloading] = useState(false);
  const result = 40;
  const order = "relevance";
  const [books, setBooks] = useState([]);
  const [role, setRole] = useState('');
  const { data: session } = useSession();
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    if (!role) {
      setError("Role is necessary.");
      return;
    }
    try {
      setloading(true);
      const resUsersByRole = await fetch("api/usersByRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });
      const { user: data } = await resUsersByRole.json();

      setBooks(data || []);
      setloading(false);
      setError(null);
    } catch (error) {
      console.error("An error occurred:", error);
      setBooks([]);
    }
  };

  const handleSearchKeyDown = (event) => {
    event.preventdefault;
    if (event.key === "Enter") {
      fetchBooks();
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8 ">
      <div className="font-MyFont flex justify-between">
        <input
          type="text"
          placeholder="Search Here"
          value={searchQuery}
          className="items-center w-full border-2 rounded-lg py-2 px-4"
          onKeyDown={handleSearchKeyDown}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <div className="font-semibold border-2 rounded-lg flex align-center">Search</div> */}
        <select
          onChange={(e) => setRole(e.target.value)}
          id="role"
          name="role"
          placeholder="Select role"
          className="peer block rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
        >
          <option value="">Select role...</option>
          <option value="employer">Employer</option>
          <option value="skilled-worker">Skilled Worker</option>
        </select>
        <div className="flex  border-2 border-black rounded-full gap-4 px-4 py-2 ml-2 "
         onClick={() => {
          fetchBooks();
        }}>
          <div className="font-semibold ">Search</div>
          <BiSearch
            className="icon-s mt-2 "
          
          />
        </div>
      </div>
      <div className="flex float-right underline mt-2 mr-8">
        <Link
          className="flex items-center font-MyFont font-medium"
          href={{
            pathname: "/AdvanceSearch",
          }}
        >
          Advanced Search options
        </Link>
      </div>
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
          <Card books={books} />
        )}
        {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
      </div>
    </div>
  );
}
