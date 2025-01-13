"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AiOutlineClose,
} from "react-icons/ai";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMailUnreadOutline } from "react-icons/io5";
import { FiFacebook } from "react-icons/fi";
import { CgLogIn } from "react-icons/cg";

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

async function fetchNotifications(email) {
  try {
    const response = await fetch("/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    throw new Error('Failed to fetch notifications');
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const fetchSessionAndNotifications = async () => {
      try {
        const sessionData = await fetchSessionData();
        setSession(sessionData);

        const email = sessionData?.user?.email;
        if (email) {
          const userNotifications = await fetchNotifications(email);
          setNotifications(userNotifications?.notification);
        }
      } catch (error) {
        console.error("Error fetching session or notifications:", error);
      }
    };

    fetchSessionAndNotifications();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const toggleShadow = () => {
      if (navbar) {
        navbar.classList.toggle("shadow", window.scrollY > 10);
      }
    };
    toggleShadow();
    window.addEventListener("scroll", toggleShadow);
    return () => {
      window.removeEventListener("scroll", toggleShadow);
    };
  }, []);
  useEffect(() => {
    const navbarr = document.querySelector(".small-navbar");
    const toggleShadow = () => {
      if (navbarr) {
        navbarr.classList.toggle("shadow", window.scrollY > 10);
      }
    };
    toggleShadow();
    window.addEventListener("scroll", toggleShadow);
    return () => {
      window.removeEventListener("scroll", toggleShadow);
    };
  }, []);
  return (
    <div className="sticky top-0 z-20 ">
      <div className="sticky top-0 z-20 md:justify-between lg:justify-around navbar px-8 py-6 bg-primary nav-main hidden md:flex ">
        <Link className="font-main text-4xl font-semibold md:flex" href="/">
          {" "}
          Online Skilled Worker Booking System for Socorro{" "}
        </Link>
        <div className=" hidden md:flex text-lg font-MyFont gap-x-8 ">
        {session?.user?.role === 'employer' && (
          <>
            <Link
              href={{
                pathname: "/SeeAll",
                query: {
                  heading: "skilled-worker",
                  order: "newest",
                  title: "Skilled Worker",
                },
              }}
              className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
            >
              <CgLogIn className="mt-1 icon-top mr-3" />
              <p className="hidden md:block">Find Talents</p>
            </Link>
            <button
              onClick={toggleNotifications}
              className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
            >
              <CgLogIn className="mt-1 icon-top mr-3" />
              <p className="hidden md:block">Notifications</p>
            </button>
        </>
        )}
        {session?.user?.role === 'admin' && (
          <>
            <Link
              href="/manageAccount"
              className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
            >
              <CgLogIn className="mt-1 icon-top mr-3" />
              <p className="hidden md:block">Manage Accounts</p>
            </Link>
        </>
        )}
        {session?.user?.role === 'skilled-worker' && (
          <>
            <Link
              href={{
                pathname: "/SeeAll",
                query: {
                  heading: "employer",
                  order: "newest",
                  title: "Employer",
                },
              }}
              className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
            >
              <CgLogIn className="mt-1 icon-top mr-3" />
              <p className="hidden md:block">Find Work</p>
            </Link>
            <button
              onClick={toggleNotifications}
              className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
            >
              <CgLogIn className="mt-1 icon-top mr-3" />
              <p className="hidden md:block">Notifications</p>
            </button>
        </>
        )}
        {session ? (
          <>
          <Link
            href="/dashboard"
            className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
          >
            <CgLogIn className="mt-1 icon-top mr-3" />
            <p className="hidden md:block">Profile</p>
          </Link>
          </>
        ) : (
          <>
            <Link
              href={{
                pathname: "/SeeAll",
                query: {
                  heading: "employer",
                  order: "newest",
                  title: "Employer",
                },
              }}
              className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
            >
              <CgLogIn className="mt-1 icon-top mr-3" />
              <p className="hidden md:block">Find Work</p>
            </Link>
            <Link
              href={{
                pathname: "/SeeAll",
                query: {
                  heading: "skilled-worker",
                  order: "newest",
                  title: "Skilled Worker",
                },
              }}
              className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
            >
              <CgLogIn className="mt-1 icon-top mr-3" />
              <p className="hidden md:block">Find Talents</p>
            </Link>
            <Link
              href="/login"
              className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
            >
              <CgLogIn className="mt-1 icon-top mr-3" />
              <p className="hidden md:block">Login</p>
            </Link>
          </>
        )}
        </div>
      </div>
      {showNotifications && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeNotifications}
          ></div>

          {/* Notification Content */}
          <div className="relative ml-auto w-80 bg-white h-screen shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeNotifications}
            >
              <AiOutlineClose size={24} />
            </button>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Notifications</h2>
              <ul className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <li key={index} className="bg-gray-100 p-4 rounded-md">
                      {notification.jobOffer && (
                        <p className="text-sm">
                          You have been sent a job offer from {notification.jobOffer}.
                        </p>
                      )}
                      {notification.endContract && (
                        <p className="text-sm">
                          Contract has been ended by {notification.endContract}.
                        </p>
                      )}
                      {notification.hireWorker && (
                        <p className="text-sm">
                          You hired worker with jobId {notification.hireWorker}.
                        </p>
                      )}
                      {notification.endWorkerContract && (
                        <p className="text-sm">
                          You ended contract worker with jobId {notification.endWorkerContract}.
                        </p>
                      )}
                      <span className="text-xs text-gray-500">
                        {new Date(notification?.date).toLocaleString()}
                      </span>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No notifications</p>
                )}
              </ul>
            </div>
          </div>
        </div>
        )}
      {/*============================================================================= */}
      <div className="sticky top-0 z-20 flex justify-between small-navbar px-4 py-6 bg-primary md:hidden ">
        {/*hidden nav section ---------------- */}
        <div className="flex md:hidden">
          <HiMenuAlt2 className="mt-1 icon-top mr-3" onClick={openModal} />
        </div>
        <div className="flex md:hidden">
          <a
            className="font-main text-base font-semibold"
            href="/"
          >
            Online Skilled Worker Booking System for Socorro
          </a>
        </div>
        {session ? (
          <div className="flex mt-2 gap-x-6  mr-2 md:hidden">
            <Link href="/login"
            onClick={closeModal}>
              {" "}
              <CgLogIn className="icon-top" />
            </Link>
          </div>
        ) : (
          <div className="flex mt-2 gap-x-6  mr-2 md:hidden">
            <Link href="/login"
            onClick={closeModal}>
              {" "}
              <CgLogIn className="icon-top" />
            </Link>
          </div>
        )}
      </div>
      {/*============================================================================= */}
      <div id="modal">
        <div className="fixed top-0 left-0 z-30 h-screen w-full bg-skin-dark transition-all delay-300 duration-500 md:hidden opacity-50"></div>
        <div
          className={`fixed main-navbar top-0 z-30 flex h-screen max-h-screen w-10/12 flex-col items-center 
          overflow-y-scroll bg-primary p-4 transition-transform duration-300 md:hidden translate-x-0 ${
            isOpen ? "open" : "close"
          } `}
        >
          <button
            type="button"
            title="Close Menu"
            onClick={closeModal}
            className="self-end p-1 mt-4"
          >
            <AiOutlineClose className="icon-bottom" />
          </button>
          <nav className="mt-8 mb-6 self-stretch">
            <div className="relative">
              <ul className="flex flex-col items-start gap-x-2 divide-y divide-gray-200 text-xl md:gap-x-4 font-MyFont">
              {session?.user?.role === 'employer' && (
              <>
                <li className="flex w-full flex-col">
                  <Link
                    href={{
                      pathname: "/SeeAll",
                      query: {
                        heading: "skilled-worker",
                        order: "newest",
                        title: "Skilled Worker",
                      },
                    }}
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>Find Talents</span>
                  </Link>
                </li>
                <Link
                  href="#"
                  className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
                  >
                  <CgLogIn className="mt-1 icon-top mr-3" />
                  <p className="hidden md:block">Notifications</p>
                </Link>
              </>
              )}
              {session?.user?.role === 'skilled-worker' && (
              <>
                <li className="flex w-full flex-col">
                  <Link
                    href={{
                      pathname: "/SeeAll",
                      query: {
                        heading: "employer",
                        order: "newest",
                        title: "Employer",
                      },
                    }}
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>Find Work</span>
                  </Link>
                </li>
                <li className="flex w-full flex-col">
                  <Link
                    href="#"
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    <span>Notifications</span>
                  </Link>
                </li>
                <li className="flex w-full flex-col">
                  <Link
                    href="#"
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>My Work</span>
                  </Link>
                </li>
              </>
              )}
              {session ? (
                <>
                <li className="flex w-full flex-col">
                  <Link
                    href="/dashboard"
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>Profile</span>
                  </Link>
                </li>
                </>
              ) : (
              <>
                <li className="flex w-full flex-col">
                  <Link
                    href={{
                      pathname: "/SeeAll",
                      query: {
                        heading: "employer",
                        order: "newest",
                        title: "Employer",
                      },
                    }}
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>Find Work</span>
                  </Link>
                </li>
                <li className="flex w-full flex-col">
                  <Link
                    href={{
                      pathname: "/SeeAll",
                      query: {
                        heading: "skilled-worker",
                        order: "newest",
                        title: "Skilled Worker",
                      },
                    }}
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>Find Talents</span>
                  </Link>
                  <Link
                    href="#"
                    className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
                    >
                    <CgLogIn className="mt-1 icon-top mr-3" />
                    <p className="hidden md:block">Notifications</p>
                  </Link>
                </li>
                <li className="flex w-full flex-col">
                  <Link
                    href="/login"
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>Login</span>
                  </Link>
                </li>
              </>
              )}
                <li className="flex w-full flex-col">
                  <Link
                    href="/About"
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>About Us</span>
                  </Link>
                </li>
                <li className="flex w-full flex-col">
                  <Link
                    href="/Contact"
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>Contact US</span>
                  </Link>
                </li>
                <li className="flex w-full flex-col">
                  <Link
                    href="/Policy"
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>Privacy Policy</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="flex flex-row gap-x-8 mt-3 justify-center md:justify-start opacity-80 !stroke-current stroke-2 py-2 mb-0">
            {" "}
            <Link href="https://www.facebook.com/profile.php?id=61570610289661" target="_blank">
              {" "}
              <FiFacebook className="icon-bottom " />{" "}
            </Link>
            <Link href="mailto:bgfcstudents02@gmail.com">
              {" "}
              <IoMailUnreadOutline className="icon-bottom" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
