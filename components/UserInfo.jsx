"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import cookie2 from "js-cookie";
import Cookies from "js-cookie";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { MdCarpenter } from "react-icons/md";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function UserInfo() {
  const { data: session } = useSession();
  const router = useRouter();
  const [workerSkills, setWorkerSkills] = useState([]);

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

    fetchWorkerSkills();
  }, [session]);

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <div className="flex pb-8 md:pb-0 md:pr-10 xl:pr-20 font-main text-xl md:text-3xl ">
        Welcome to SkillMatch Socorro
      </div>
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
      { session?.user?.role === 'skilled-worker' && (
      <>
        <div className="flex pb-8 md:pb-0 md:pr-10 xl:pr-20 font-main text-xl md:text-3xl mt-8 ">
        Worker Skill Set
        </div>
        {workerSkills.map((skill, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-xl font-bold mb-2">{skill}</h2>
            <MdCarpenter className="ml-2" />
            {/* <p>
              <strong>Name:</strong> {skill}
            </p> */}
            {/* <p>
              <strong>Email:</strong> {payment.email}
            </p>
            <p>
              <strong>Phone:</strong> {payment.phone}
            </p>
            <p>
              <strong>Address:</strong> {payment.address}
            </p>
            <p>
              <strong>Payment:</strong> {payment.payment}
            </p>
            <p>
              <strong>Ordered Items:</strong>{" "}
              {payment.items
                .map((item) => `${item.id}, ${item.title}, ${item.price}`)
                .join(", ")}
            </p>
            <p>
              <strong>Total Amount:</strong> {payment.total}
            </p>
            <p>
              <strong>Razorpay Order ID:</strong> {payment.razorpay_order_id}
            </p>
            <p>
              <strong>Razorpay Payment ID:</strong> {payment.razorpay_payment_id}
            </p>
            <p className="break-words">
              <strong>Razorpay Signature:</strong> {payment.razorpay_signature}
            </p>
            <div className="flex justify-between flex-col md:flex-row gap-4">
              <button
                className="mt-4 text-xl w-max bg-blue-500 text-white py-2 px-4 rounded"
                // onClick={() => downloadPdf(payment)}
              >
                Download Order Details as PDF
              </button>
              <Link
                className="flex items-center font-MyFont font-medium w-max  bg-blue-500 text-white py-2 px-4 rounded"
                // onClick={() => handleTrack(payment)}
                href={{
                  pathname: "/Track",
                  query: {
                    paymentid: payment.razorpay_order_id,
                    date: new Date(payment.createdAt).toISOString().split("T")[0],
                  },
                }}
              >
                Track your order
                <IoIosArrowForward className="ml-2" />
              </Link>
            </div> */}
          </div>
        ))}
      </>
      )}
    </div>
  );
}
