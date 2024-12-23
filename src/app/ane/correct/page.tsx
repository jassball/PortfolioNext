"use client";
import { useState } from "react";
import Image from "next/image";
import { Svg } from "@/constants/svg";
import Navbar from "@/components/ui/navbar";

export default function Page() {
  // State to track the revealed images for each row
  const [revealedImages, setRevealedImages] = useState<{
    [key: string]: string | null;
  }>({
    row1: null,
    row2: null,
    row3: null,
  });

  // Presents data for each row
  const rows = [
    { id: "row1", present: Svg.presentOne, revealed: Svg.toParis },
    { id: "row2", present: Svg.presentOne, revealed: Svg.fromParis },
    { id: "row3", present: Svg.presentFireball, revealed: Svg.ticketPitbull },
  ];

  // Handle click to reveal the image for a specific row
  const handleClick = (rowId: string, revealedImage: string) => {
    setRevealedImages((prevState) => ({
      ...prevState,
      [rowId]: revealedImage,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto flex flex-col items-center h-full px-4">
        <div className="space-y-8">
          {rows.map((row) => (
            <div key={row.id} className="flex justify-center items-center">
              {revealedImages[row.id] ? (
                <Image
                  className="transition-all duration-300"
                  src={revealedImages[row.id] || ""}
                  alt={`Revealed ${row.id}`}
                  width={480}
                  height={250}
                />
              ) : (
                <Image
                  className="cursor-pointer transition-all duration-300"
                  src={row.present}
                  alt={`Present ${row.id}`}
                  width={450}
                  height={450}
                  onClick={() => handleClick(row.id, row.revealed)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
