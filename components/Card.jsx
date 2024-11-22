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
      // Handle the case when WishlistItems is empty
      // You can set liked to an empty array or take any other appropriate action
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
            <div className="p-4 sm:p-8 md:p-4 lg:p-8 cursor-pointer bg-bggray">
              <Image
                src={participant?.imageUrl || "/creation1.png"}
                priority="high"
                unoptimized={true}
                className="inline-block align-baseline"
                width={500}
                height={500}
                alt="Picture of the participant"
                onError={(e) => {
                  e.target.src = "/creation1.png";
                }}
              />
            </div>
          </Link>

          <div className="content px-4 py-4 flex flex-col justify-between">
            <div className="mb-2 md:line-clamp-1">
              <h3 className="text-base font-MyFont">{participant?.lastName}, {participant?.firstName}</h3>
            </div>
            <div className="mb-2 md:line-clamp-1">
              <h3 className="text-base font-MyFont">{participant?.phoneNumber}</h3>
            </div>
            <div className="mb-2 md:line-clamp-1">
              <h3 className="text-base font-MyFont">{participant?.homeAddress}</h3>
            </div>
            {participant?.yearsExperience && (
              <div className="mb-2 md:line-clamp-1">
                <h3 className="text-base font-MyFont">{participant.yearsExperience} years of experienced.</h3>
              </div>
            )}
            {participant?.dailyRate && (
              <div className="mb-2 md:line-clamp-1">
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
