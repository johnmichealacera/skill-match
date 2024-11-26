"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WIshlistContext";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import Link from 'next/link';

function Card({ participants }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, WishlistItems } = useWishlist();
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    if (WishlistItems && WishlistItems.length > 0) {
      // Set the liked state based on the items in the wishlist
      setLiked(WishlistItems?.map((item) => item.id));
    } else {
      setLiked([]);
    }
  }, []);

  const handleCardClick = (selfLink) => {
    window.open(selfLink, "_blank");
  };

  return (
    <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {participants?.map((participant, index) => (
        <div
          key={index}
          className="flex flex-col justify-between rounded border-2 border-bggray align-baseline"
        >
          <Link href={`/Profile/${participant._id}/view`}>
            <div className="p-4 cursor-pointer bg-bggray">
              {/* Image container with fixed aspect ratio */}
              <div className="relative w-full h-40 sm:h-64 md:h-72 lg:h-80 overflow-hidden rounded-md">
                <Image
                  src={participant?.imageUrl || "/creation1.png"}
                  priority="high"
                  unoptimized={true}
                  className="absolute object-cover w-full h-full"
                  fill
                  alt="Picture of the participant"
                  onError={(e) => {
                    e.target.src = "/creation1.png";
                  }}
                />
              </div>
            </div>
          </Link>

          <div className="content px-4 py-4 flex flex-col justify-between">
            <div className="mb-2 md:line-clamp-1 sm:line-clamp-1 line-clamp-1">
              <h3 className="text-base font-MyFont">
                {participant?.lastName}, {participant?.firstName}
              </h3>
            </div>
            <div className="mb-2 md:line-clamp-1 sm:line-clamp-1 line-clamp-1">
              <h3 className="text-base font-MyFont">{participant?.phoneNumber}</h3>
            </div>
            <div className="mb-2 md:line-clamp-1 sm:line-clamp-1 line-clamp-1">
              <h3 className="text-base font-MyFont">{participant?.homeAddress}</h3>
            </div>
            {participant?.yearsExperience && (
              <div className="mb-2 md:line-clamp-1 sm:line-clamp-1 line-clamp-1">
                <h3 className="text-base font-MyFont">
                  {participant.yearsExperience} years of experience.
                </h3>
              </div>
            )}
            {participant?.dailyRate && (
              <div className="mb-2 md:line-clamp-1 sm:line-clamp-1 line-clamp-1">
                <h3 className="text-base font-MyFont">Php {participant.dailyRate} Daily Rate</h3>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
