"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
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

const general_links = [
  { name: 'Find Skilled Worker', href: '#', icon: BiSearch },
  { name: 'Find Work', href: '#', icon: BiSearch },
  { name: 'Login', href: '/Login', icon: CgLogIn },
];
const worker_links = [
  { name: 'Find Work', href: '#', icon: BiSearch },
  { name: 'My Jobs', href: '/Login', icon: CgLogIn },
  { name: 'Messages', href: '#', icon: CgLogIn },
  { name: 'Login', href: '/Login', icon: CgLogIn },
];
const employer_links = [
  { name: 'Find Talents', href: '#', icon: BiSearch },
  { name: 'My Talents', href: '/Login', icon: CgLogIn },
  { name: 'Messages', href: '#', icon: CgLogIn },
  { name: 'Login', href: '/Login', icon: CgLogIn },
];


export default function Navbar({session1}) {
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
  const navLinks = React.useMemo(() => {
    if (session?.user?.role === 'employer') {
      return employer_links;
    } else if (session?.user?.role === 'worker') {
      return worker_links;
    } else {
      return general_links;
    }
  }, [session]);
  return (
    <div className="sticky top-0 z-20 ">
      <div className="sticky top-0 z-20 md:justify-between lg:justify-around navbar px-8 py-6 bg-primary nav-main hidden md:flex ">
        <Link className="font-main text-3xl font-semibold md:flex" href="/">
          {" "}
          SkillMatch Socorro{" "}
        </Link>
        <div className=" hidden md:flex text-lg font-MyFont gap-x-8 ">
        {navLinks.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
            >
              <LinkIcon className="mt-1 icon-top mr-3" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
        </div>
      </div>
      {/*============================================================================= */}
      <div className="sticky top-0 z-20 flex justify-between small-navbar px-4 py-6 bg-primary md:hidden ">
        {/*hidden nav section ---------------- */}
        <div className="flex md:hidden">
          <HiMenuAlt2 className="mt-1 icon-top mr-3" onClick={openModal} />
        </div>
        <div className="flex  md:hidden">
          <Link
            className="font-main text-2xl font-semibold md:text-3xl"
            href="/"
          >
            {" "}
            SkillMatch Socorro{" "}
          </Link>
        </div>
        <div className="flex mt-2 gap-x-6  mr-2 md:hidden">
          <Link href="/Login"
           onClick={closeModal}>
            {" "}
            <CgLogIn className="icon-top" />
          </Link>
        </div>
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
          <div className="flex flex-col items-center justify-center gap-2 gap-x-4">
            <Link
              href="/"
              className="font-main text-2xl font-medium"
              onClick={closeModal}
            >
              SkillMatch Socorro
            </Link>
            <p className="text-center px-6 font-MyFont">
              Your one-stop solution for hiring skilled workers or finding the perfect job.
            </p>
          </div>
          <nav className="mt-8 mb-6 self-stretch">
            <div className="relative">
              <ul className="flex flex-col items-start gap-x-2 divide-y divide-gray-200 text-xl md:gap-x-4 font-MyFont">
                <li className="flex w-full flex-col">
                  <Link
                    href="/"
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>Home</span>
                  </Link>
                </li>
                <li className="flex w-full flex-col">
                  <Link
                    href="/"
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>Find Skilled Worker</span>
                  </Link>
                </li>
                <li className="flex w-full flex-col">
                  <Link
                    href="/"
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>Find Work</span>
                  </Link>
                </li>
                <li className="flex w-full flex-col">
                  <Link
                    href="/Login"
                    onClick={closeModal}
                    className="flex items-center gap-x-2 py-1 px-2 text-xl"
                  >
                    {" "}
                    <span>Login</span>
                    <CgLogIn className="opacity-90" />
                  </Link>
                </li>
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
            <Link href="mailto:mayankkush0842@gmail.com">
              {" "}
              <IoMailUnreadOutline className="icon-bottom" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
