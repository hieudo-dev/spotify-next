export async function getPlaylists({ accessToken }) {
  const params = new URLSearchParams();
  params.set("limit", "50");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API}/me/playlists?${params}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res.json();
}
