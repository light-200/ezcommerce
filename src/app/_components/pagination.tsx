"use client";

import { useState } from "react";
import {
  CgChevronDoubleLeft,
  CgChevronDoubleRight,
  CgChevronLeft,
  CgChevronRight,
} from "react-icons/cg";

export default function Pagination({
  page,
  max,
  handlePageSelect,
}: {
  page: number;
  max: number;
  handlePageSelect: (i: number) => void;
}) {
  const [selectedPage, setSelectedPage] = useState(page);

  const handleSet = (i: number) => {
    handlePageSelect(i);
    setSelectedPage(i);
  };

  return (
    <div className="mt-4 flex items-center gap-2 text-gray-400">
      <span
        onClick={() => {
          handleSet(0);
        }}
        className="cursor-pointer p-1"
      >
        <CgChevronDoubleLeft />
      </span>
      <span
        onClick={() => {
          if (selectedPage > 0) {
            handleSet(selectedPage - 1);
          }
        }}
        className="cursor-pointer p-1"
      >
        <CgChevronLeft />
      </span>
      {selectedPage == max && <span className="select-none">...</span>}
      {Array.from({ length: 7 }).map((_, i) => {
        return (
          page + i <= max && (
            <span
              key={"pagenum" + i}
              onClick={(e) => {
                const num = Number(e.currentTarget.textContent) - 1;
                if (num > max) return;
                handleSet(num);
              }}
              className={
                "cursor-pointer p-1 " +
                (selectedPage == i + page ? "text-black" : "")
              }
            >
              {++i + page}
            </span>
          )
        );
      })}
      {selectedPage < max && <span className="select-none">...</span>}

      <span
        onClick={() => {
          if (selectedPage < max) {
            handleSet(selectedPage + 1);
          }
        }}
        className="cursor-pointer p-1"
      >
        <CgChevronRight />
      </span>
      <span
        onClick={() => {
          handleSet(max);
        }}
        className="cursor-pointer p-1"
      >
        <CgChevronDoubleRight />
      </span>
    </div>
  );
}
