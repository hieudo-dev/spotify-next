import { Playlist, Tracks } from "~types";

export async function getPlaylists({ accessToken }) {
  const params = new URLSearchParams();
  params.set("limit", "50");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API}/me/playlists?${params}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res.json();
}

export async function getPlaylist({ accessToken, id }): Promise<Playlist> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API}/playlists/${id}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res.json();
}

export async function getSavedTracks({ accessToken }): Promise<Tracks> {
  const params = new URLSearchParams();
  params.set("limit", "50");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API}/me/tracks?${params}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res.json();
}
