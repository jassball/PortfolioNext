export default function Page() {
  return (
    <div>
      <h1>ANE</h1>
    </div>
  );
}

// "use client";

// import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";

// const CLIENT_ID = process.env.NEXT_PUBLIC_PUBLIC_KEY;
// const CLIENT_SECRET = process.env.SPOTIFY_SECRET;
// const REDIRECT_URI = "http://localhost:3000/callback"; // Make sure this matches your Spotify app configuration

// const CallbackPage = () => {
//   const searchParams = useSearchParams();
//   const code = searchParams.get("code"); // Get authorization code from query string
//   const router = useRouter(); // Use router for navigation

//   useEffect(() => {
//     if (code) {
//       console.log("Code found, fetching access token...");

//       // Exchange authorization code for access token
//       const fetchAccessToken = async () => {
//         try {
//           const response = await fetch(
//             "https://accounts.spotify.com/api/token",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
//               },
//               body: new URLSearchParams({
//                 grant_type: "authorization_code",
//                 code: code!,
//                 redirect_uri: REDIRECT_URI,
//               }),
//             }
//           );

//           const data = await response.json();
//           console.log("Access Token Data:", data); // Log the access token response

//           if (data.access_token) {
//             console.log("Access token received, storing in localStorage...");
//             localStorage.setItem("access_token", data.access_token); // Store access token

//             // Redirect to top artists page after storing the access token
//             router.push("/spotify/top-artists");
//           } else {
//             console.error("Error: No access token received.", data);
//           }
//         } catch (error) {
//           console.error("Error fetching access token:", error);
//         }
//       };

//       fetchAccessToken();
//     }
//   }, [code, router]);

//   return (
//     <div>
//       <h1>Handling Spotify Callback...</h1>
//     </div>
//   );
// };

// export default CallbackPage;
