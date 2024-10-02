"use client";

import Navbar from "@/components/ui/navbar";
import { useEffect, useState } from "react";

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
        setTopArtists(data.items);
      });

      // Fetch top 5 tracks
      fetchTopItems(accessToken, "tracks", 5).then((data) => {
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
          <div>
            <h2>Top 5 Artists</h2>
            <ul>
              {topArtists.map((artist) => (
                <li key={artist.id}>
                  <p>{artist.name}</p>
                  <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    width={100}
                  />
                  <p>Genres: {artist.genres.join(", ")}</p>
                  <p>Followers: {artist.followers.total}</p>
                </li>
              ))}
            </ul>

            <h2>Top 5 Tracks</h2>
            <ul>
              {topTracks.map((track) => (
                <li key={track.id}>
                  <p>
                    {track.name} by{" "}
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                  <img
                    src={track.album.images[0]?.url}
                    alt={track.name}
                    width={100}
                  />
                  <p>Album: {track.album.name}</p>
                  <p>Popularity: {track.popularity}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default TopArtistsAndTracksPage;
