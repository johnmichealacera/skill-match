"use client";
import React, { useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import { useSearchParams } from "next/navigation";
import Card from "@/components/Card"; // Reuse your existing Card component

const ManageAccount = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [status, setStatus] = useState(""); // State to track the account status filter
  const [activeTab, setActiveTab] = useState("employer"); // State to track active tab (employer or skilled-worker)

  // Fetch users based on the active tab and role (employer/skilled-worker)
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const role = activeTab === "employer" ? "employer" : "skilled-worker";
        const res = await fetch("/api/usersByRole", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
        });

        const { user: usersData } = await res.json();
        setUsers(usersData || []);
        setFilteredUsers(usersData || []);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setUsers([]);
        setFilteredUsers([]);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [activeTab]);

  // Handle status filter change
  const handleStatusChange = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" || !currentStatus ? "inactive" : "active";
      console.log('newStatus', newStatus);
      
      const res = await fetch("/api/updateUserStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        // Update the user status in the local state (both users and filteredUsers)
        const updatedUsers = users.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers); // Ensure both lists are updated
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <h1 className="font-main text-xl my-4 flex justify-center font-semibold mr-auto md:text-2xl">
        Manage Accounts
      </h1>

      {/* Tabs for Employers and Skilled Workers */}
      <div className="flex justify-center mb-4">
        <button
          className={`py-2 px-4 ${activeTab === "employer" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("employer")}
        >
          Employers
        </button>
        <button
          className={`py-2 px-4 ${activeTab === "skilled-worker" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("skilled-worker")}
        >
          Skilled Workers
        </button>
      </div>

      {/* Status filter */}
      {/* <div className="flex justify-center mb-4">
        <label htmlFor="statusFilter" className="mr-2 font-main text-lg">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded-md text-gray-700"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div> */}

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers
              .filter(
                (user) =>
                  !status || user.status === status // Apply status filter
              )
              .map((user) => (
                <div key={user._id} className="border rounded p-4">
                  <div className="flex items-center">
                    <img
                      src={user.imageUrl || "/default-avatar.jpg"}
                      alt={user.firstName}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-bold">{user.firstName} {user.lastName}</h2>
                      <p className="text-gray-500">{user.role}</p>
                      <p className="text-sm">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStatusChange(user._id, user.status)}
                    className={`mt-4 p-2 rounded ${
                      user.status === "inactive" ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                  >
                    {user.status === "inactive" ? "Activate" : "Deactivate"}
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAccount;
