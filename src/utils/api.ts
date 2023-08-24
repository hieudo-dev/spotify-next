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
export async function getUserProfile({ accessToken }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API}/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.json();
}

export async function getArtist({ accessToken, id }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API}/artists/${id}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res.json();
}

export async function getTopTracks({ market, accessToken, id }) {
  const params = new URLSearchParams();
  params.set("market", market);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API}/artists/${id}/top-tracks?${params}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res.json();
}

export async function getAlbums({ accessToken, id }) {
  const params = new URLSearchParams();
  params.set("limit", "50");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API}/artists/${id}/albums?${params}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res.json();
}

export async function getRelatedArtists({ accessToken, id }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API}/artists/${id}/related-artists`,
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

export async function getAlbum({ accessToken, id }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API}/albums/${id}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res.json();
}

export async function getFeaturedPlaylists({ accessToken }) {
  const params = new URLSearchParams();
  params.set("limit", "50");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API}/browse/featured-playlists?${params}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res.json();
}

export async function getNewReleases({ accessToken }) {
  const params = new URLSearchParams();
  params.set("limit", "50");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API}/browse/new-releases?${params}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res.json();
}
