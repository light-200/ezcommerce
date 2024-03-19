"use client";

import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function Offer() {
  const [index, setIndex] = useState(0);
  const [offer, setOffer] = useState([
    "We will create a personalised offer soon.",
  ]);

  return (
    <div className="flex items-center justify-center gap-4 bg-gray-100 py-1 text-center text-sm">
      <span
        onClick={() => {
          setIndex((i) => {
            if (offer.length > 1) return --i;
            return i;
          });
        }}
        className="cursor-pointer"
      >
        <BiChevronLeft />
      </span>
      <p className="w-fit">{offer[index]}</p>
      <span
        onClick={() => {
          setIndex((i) => {
            if (offer.length > 1) return ++i;
            return i;
          });
        }}
        className="cursor-pointer"
      >
        <BiChevronRight />
      </span>
    </div>
  );
}
