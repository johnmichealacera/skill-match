'use client'
import React from 'react';
import Image from "next/image";
import { IoMailUnreadOutline } from "react-icons/io5";
import { PiTelegramLogo } from "react-icons/pi";
import { SlSocialInstagram } from "react-icons/sl";
import { FiArrowDownCircle, FiFacebook } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from 'next/navigation'

export default function Main() {
  
 const router = useRouter()
  return (
    <div className="flex flex-col justify-between mx-auto max-w-6xl gap-y-4 px-4 py-6 md:flex-row-reverse md:gap-x-4 md:px-8 lg:py-10">
      <div>
        <Image
          src="/skilled-worker-creation_1_1682x1545.webp"
          className="drop-shadow " 
          unoptimized = {true}
          priority="high"
          width={540}
          height={540}
          alt="Picture of the author"
        />
      </div>
      <div className="info-wrapper flex flex-1 flex-col gap-y-4 md:justify-center lg:justify-end lg:gap-y-8">
        <h1 className="font-main text-2xl font-semibold md:!leading-tight lg:text-4xl xl:text-5xl opacity-80 ">
          {" "}
          Best Place to Find <br></br> Skilled <br></br> Workers.
        </h1>
        <p className="font-MyFont lg:text-lg opacity-80 ">Your one-stop solution for hiring skilled workers or finding the perfect job.</p>
        <div className="flex flex-row gap-x-8 mt-6 opacity-80 !stroke-current stroke-2 ">
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
        <div className="mt-12 flex gap-2 font-MyFont divide-x divide-textgray md:w-[125%] lg:w-auto">
          <div className="">Quick Hiring</div>
          <div className=" pl-2">Reliable Experts</div>
          <div className=" pl-2">Tailored Services</div>
        </div>
      </div>
    </div>
  );
}
