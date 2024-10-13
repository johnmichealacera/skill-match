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
            <div className="flex w-max justify-between">
              <div className="cursor-pointer pt-4 px-1">
                <button
                  onClick={() => {
                    const participantDetails = {
                      id: participant._id,
                      title: `${participant?.lastName}, ${participant?.firstName}`,
                      author: participant?.lastName,
                      skills: participant?.skills,
                    };
                    addToCart(participantDetails, participant.id);
                  }}
                  className="bg-textgray justify-center px-2 py-2 font-MyFont text-primary flex-1 rounded md:px-4 text-sm font-semibold"
                >
                  Contact
                </button>
              </div>

              <div className="flex cursor-pointer w-max px-1 pt-2">
                <button
                  onClick={() => {
                    const participantDetails = {
                      id: participant._id,
                      title: `${participant?.lastName}, ${participant?.firstName}`,
                      author: participant?.lastName,
                      skills: participant?.skills,
                    };
                    if (liked.includes(participant._id)) {
                      removeFromWishlist(participant._id);
                      setLiked(liked.filter((id) => id !== participant._id));
                      toast.error("User Removed From Wishlist successfully");
                    } else {
                      addToWishlist(participantDetails);
                      setLiked([...liked, participant._id]);
                    }
                  }}
                  className="outline-btn-color cursor-pointer basis-1/4 rounded p-1"
                  title="Add To Wishlist"
                >
                  {liked.includes(participant._id) ? (
                    <FcLike fontSize="1.75rem" />
                  ) : (
                    <FcLikePlaceholder fontSize="1.75rem" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
