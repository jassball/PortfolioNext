"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const CLIENT_SECRET = process.env.SPOTIFY_SECRET;
const REDIRECT_URI =
  "https://portfolio-next-31ts0e030-jassballs-projects.vercel.app/callback"; // Same redirect URI you used earlier

const CallbackPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code"); // Get authorization code from query string
  const router = useRouter(); // Use router for navigation

  useEffect(() => {
    if (code) {
      // Exchange authorization code for access token
      const fetchAccessToken = async () => {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code: code!,
            redirect_uri: REDIRECT_URI,
          }),
        });

        const data = await response.json();
        console.log("Access Token Data:", data); // Access token response from Spotify

        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token); // Store access token

          // Redirect to top artists page after storing the access token
          router.push("/spotify/top-artists");
        }
      };

      fetchAccessToken();
    }
  }, [code, router]);

  return (
    <div>
      <h1>Handling Spotify Callback...</h1>
    </div>
  );
};

const CallbackWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CallbackPage />
  </Suspense>
);

export default CallbackWrapper;
