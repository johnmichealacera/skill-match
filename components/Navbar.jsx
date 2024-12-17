"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AiOutlineClose,
} from "react-icons/ai";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMailUnreadOutline } from "react-icons/io5";
import { PiTelegramLogo } from "react-icons/pi";
import { SlSocialInstagram } from "react-icons/sl";
import { FiFacebook } from "react-icons/fi";
import { CgLogIn } from "react-icons/cg";
import { useWishlist } from "@/context/WIshlistContext";

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


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const fetchSession = async () => {
      const session = await fetchSessionData();
      setSession(session);
    };
    fetchSession();
  }, []);
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
          {/* <Link
          href="#"
          className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
          >
            <CgLogIn className="mt-1 icon-top mr-3" />
            <p className="hidden md:block">My Talents</p>
          </Link> */}
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
          {/* <Link
            href="#"
            className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
          >
            <CgLogIn className="mt-1 icon-top mr-3" />
            <p className="hidden md:block">My Work</p>
          </Link> */}
        </>
        )}
        {session ? (
          <>
          {/* <Link
            href="#"
            className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
          >
            <CgLogIn className="mt-1 icon-top mr-3" />
            <p className="hidden md:block">Messages</p>
          </Link> */}
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
                {/* <li className="flex w-full flex-col">
                  <Link
                    href="#"
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>My Talents</span>
                  </Link>
                </li> */}
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
                {/* <li className="flex w-full flex-col">
                  <Link
                    href="#"
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>Messages</span>
                  </Link>
                </li> */}
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
            <Link href="https://www.facebook.com/">
              {" "}
              <FiFacebook className="icon-bottom " />{" "}
            </Link>
            <Link href="https://www.instagram.com/_mayank._k___/">
              {" "}
              <SlSocialInstagram className="icon-bottom" />{" "}
            </Link>
            <Link href="https://t.me/+919023373686">
              {" "}
              <PiTelegramLogo className="icon-bottom" />{" "}
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
