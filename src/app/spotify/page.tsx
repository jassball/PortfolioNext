"use client"; // Important for components to use client-side functionality

import Navbar from "@/components/ui/navbar";
import React from "react";
import { Svg } from "@/constants/svg";
import Image from "next/image";

const CLIENT_ID = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const REDIRECT_URI = "http://localhost:3000/callback"; // Make sure this matches your Spotify developer app
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "code";
const SCOPE = "user-top-read";

const AuthPage = () => {
  const handleLogin = () => {
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    window.location.href = authUrl; // Redirect the user to Spotify login
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto flex items-center h-full justify-center pt-12">
        <div
          className="h-[400px] w-[400px] bg-gradient-to-b from-stone-900 to-neutral-800 text-white font-bold 
        shadow-2xl rounded-sm mx-auto flex items-center flex-col p-6 space-y-24 "
        >
          <div className="flex flex-col justify-center items-center space-y-2 ">
            <Image
              src={Svg.whiteSpotifySvg}
              alt="Spotify Logo"
              width={40}
              height={40}
            />
            <h1 className="text-3xl">Spotify Authorization</h1>
          </div>
          <div></div>
          <button
            className="text-black bg-spotify rounded-3xl p-2 w-4/5 "
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
