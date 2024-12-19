"use client";

import Navbar from "@/components/ui/navbar";
import { useEffect, useState } from "react";
import { Svg } from "@/constants/svg";

const fetchTopItems = async (
  accessToken: string,
  type: "artists" | "tracks",
  limit: number
) => {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/${type}?limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Use the access token
      },
    }
  );

  const data = await response.json();
  console.log(`Top ${type} response:`, data); // Print the response for debugging
  return data;
};

const TopArtistsAndTracksPage = () => {
  interface Artist {
    id: string;
    name: string;
    images: { url: string }[];
    genres: string[];
    followers: { total: number };
  }

  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    album: { name: string; images: { url: string }[] };
    popularity: number;
  }

  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token"); // Retrieve the access token from localStorage

    if (accessToken) {
      // Fetch top 5 artists
      fetchTopItems(accessToken, "artists", 5).then((data) => {
        console.log("Top Artists Data:", data); // Log the fetched top artists data
        setTopArtists(data.items);
      });

      // Fetch top 5 tracks
      fetchTopItems(accessToken, "tracks", 5).then((data) => {
        console.log("Top Tracks Data:", data); // Log the fetched top tracks data
        setTopTracks(data.items);
        setLoading(false);
      });
    } else {
      console.log("No access token found.");
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl">
        <h1>Your Top Artists and Tracks</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex ">
            <h2>Top 5 Artists</h2>
            <div>
              {topArtists.map((artist) => (
                <div key={artist.id}>
                  <p>{artist.name}</p>
                  <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    width={100}
                  />
                  <p>Genres: {artist.genres.join(", ")}</p>
                  <p>Followers: {artist.followers.total}</p>
                </div>
              ))}
            </div>

            <h2>Top 5 Tracks</h2>
            <div className="bg-gradient-to-b w-[400px] from-stone-900 to-neutral-800 text-white flex flex-col p-5">
              {topTracks.map((track) => (
                <div
                  className="flex flex-col items-center space-y-2"
                  key={track.id}
                >
                  <img
                    src={track.album.images[0]?.url}
                    alt={track.name}
                    className="object-cover"
                  />
                  <div className="flex flex-col items-start justify-start">
                    <div className="flex items-center justify-between">
                      <Svg.IoIosAlbums />
                      <p>{track.name} by </p>
                    </div>
                    <p>
                      {" "}
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </p>
                    <p>Album: {track.album.name}</p>
                    <p>Popularity: {track.popularity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TopArtistsAndTracksPage;
