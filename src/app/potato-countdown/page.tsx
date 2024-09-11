"use client";
import Navbar from "@/components/ui/navbar";
import { useState, useEffect } from "react";
import { Svg } from "@/constants/svg";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Page() {
  const calculateTimeLeft = () => {
    const targetDate = new Date("January 1, 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    let timeLeft = {
      days: 0,
      hours: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [matchPositions, setMatchPositions] = useState<
    { top: string; left: string; rotation: number }[]
  >([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to generate positions and rotations for the matches outside the potato
  const generatePositionsAndRotations = () => {
    const positions = [];
    const centerX = 50; // Center of the potato (50%)
    const centerY = 50; // Center of the potato (50%)
    const numMatches = Math.min(timeLeft.days, 365); // Limit to 365 matches for performance

    for (let i = 0; i < numMatches; i++) {
      // Generate random angle to position match around the potato's perimeter
      const angle = (Math.random() * 360 * Math.PI) / 180;

      // Control how far out the match should be placed from the potato outline
      const distanceFromCenter = 60; // Control this value to adjust distance

      // Calculate positions outside the potato outline (using trigonometry)
      const top = centerY + distanceFromCenter * Math.sin(angle); // Y-coordinate
      const left = centerX + distanceFromCenter * Math.cos(angle); // X-coordinate

      // Calculate rotation towards the potato's center
      const rotation =
        Math.atan2(centerY - top, centerX - left) * (180 / Math.PI);

      positions.push({ top: `${top}%`, left: `${left}%`, rotation });
    }

    return positions;
  };

  // Generate the positions and rotations whenever the number of days changes
  useEffect(() => {
    setMatchPositions(generatePositionsAndRotations());
  }, [timeLeft.days]); // Regenerate positions when the number of days changes

  // Generate match SVGs based on the positions
  const renderMatches = () => {
    return matchPositions.map((pos, i) => (
      <div
        key={i}
        className="absolute"
        style={{
          top: pos.top,
          left: pos.left,
          transform: `rotate(${pos.rotation}deg) translateY(-50%)`,
        }}
      >
        <Image src={Svg.match} alt="Match" width={10} height={50} />
      </div>
    ));
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl">
        <div className="relative flex justify-center items-center mt-24">
          <div>
            <Image src={Svg.potato} alt="Potato" width={500} height={800} />
            <div
              id="calendarContainer"
              className="absolute inset-0 flex justify-center items-center  z-10"
            >
              <HoverCard>
                <HoverCardTrigger>
                  <div className=" w-36 text-center h-42 bg-white pb-4 rounded-lg shadow-lg">
                    <p className="text-xl text-white font-bold bg-red-700 p-4">
                      Days left
                    </p>
                    <p className="text-3xl mt-4 text-slate-600 font-bold p-4">
                      {timeLeft.days}
                    </p>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-full">
                  <p className="text-center">Elsker deg</p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>

          {/* Matches pointing towards the potato, sticking out from the outline */}
          <div className="absolute inset-0">{renderMatches()}</div>
        </div>
      </div>
    </>
  );
}
