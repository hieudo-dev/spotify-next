import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  getAlbums,
  getArtist,
  getRelatedArtists,
  getTopTracks,
  getUserProfile,
} from "~utils/api";
import { msToPlayTime } from "~utils/functions";

export default function PlaylistDetail() {
  const [topTracksLimit, setTopTracksLimit] = useState(5);
  const [albumsLimit, setAlbumsLimit] = useState(5);
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const { data: artist } = useQuery({
    queryKey: ["artist", id],
    queryFn: () => {
      return session
        ? getArtist({ id, accessToken: session.accessToken })
        : null;
    },
  });

  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => {
      return session
        ? getUserProfile({ accessToken: session.accessToken })
        : null;
    },
  });

  const { data: topTracks } = useQuery({
    queryKey: ["topTracks", id, userProfile?.country],
    queryFn: () => {
      return session && userProfile?.country
        ? getTopTracks({
            id,
            market: userProfile?.country,
            accessToken: session.accessToken,
          })
        : null;
    },
  });

  const { data: albums } = useQuery({
    queryKey: ["albums", id],
    queryFn: () => {
      return session
        ? getAlbums({ id, accessToken: session.accessToken })
        : null;
    },
  });

  const { data: relatedArtists } = useQuery({
    queryKey: ["relatedArtists", id],
    queryFn: () => {
      return session
        ? getRelatedArtists({ id, accessToken: session.accessToken })
        : null;
    },
  });

  if (!albums || !artist || !userProfile || !topTracks) return null;

  const handleSeeMoreTracks = () => {
    setTopTracksLimit((prev) => (prev === 5 ? 10 : 5));
  };
  const handleSeeMoreAlbums = () => {
    setAlbumsLimit((prev) => (prev === 5 ? 100 : 5));
  };

  return (
    <>
      <section className="flex items-end px-8 pt-4 pb-6">
        <Image
          className="mr-6 rounded-full shadow-3xl"
          src={artist.images[0].url}
          alt={artist.name}
          width={224}
          height={224}
        />
        <div>
          <p className="mb-4 text-sm capitalize">Artist</p>
          <p className="text-6xl font-black tracking-tight">{artist.name}</p>
          <p className="pt-6 text-sm font-light tracking-wide">
            {artist.followers.total.toLocaleString("en-US")} followers
          </p>
        </div>
      </section>
      <div className="flex-1 backdrop-blur-3xl to-black to-[400px] from-gray-800 bg-gradient-to-b bg-opacity-10">
        <div className="px-8 py-4">
          <button
            type="button"
            className="mb-6 transition-transform hover:scale-105"
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="w-5 h-5 p-4 text-black bg-green-500 rounded-full"
            />
          </button>
          <div className="flex items-center justify-between">
            <p className="mb-4 text-2xl font-bold tracking-tight">Popular</p>
            <button
              className="mt-2 text-sm text-gray-500 transition-colors hover:text-white"
              onClick={handleSeeMoreTracks}
            >
              See {topTracksLimit === 5 ? "more" : "less"}
            </button>
          </div>
          <div className="grid grid-cols-[60px_40px_1fr_40px] gap-y-4 mb-10">
            {topTracks.tracks.slice(0, topTracksLimit).map((track, index) => (
              <div key={track.id} className="items-center py-2 contents">
                <p className="text-gray-400 place-self-center">{index + 1}</p>
                <Image
                  className="self-center"
                  src={track.album.images[0].url}
                  alt={track.name}
                  width={40}
                  height={40}
                />
                <p className="self-center mx-4 text-sm font-light tracking-wide">
                  {track.name}
                </p>
                <p className="self-center ml-auto text-sm font-light tracking-wide">
                  {msToPlayTime(track.duration_ms)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="mb-4 text-2xl font-bold tracking-tight">
              Discography
            </p>
            <button
              className="mt-2 text-sm text-gray-500 transition-colors hover:text-white"
              onClick={handleSeeMoreAlbums}
            >
              See {albumsLimit === 5 ? "more" : "less"}
            </button>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 mb-10">
            {albums.items.slice(0, albumsLimit).map((album) => (
              <a className="p-4 bg-gray-400 rounded-md bg-opacity-10">
                <Image
                  className="w-full mb-4 rounded-md"
                  src={album.images[0].url}
                  alt={album.name}
                  width={180}
                  height={180}
                />
                <p className="mb-1 truncate">{album.name}</p>
                <p className="text-sm font-normal text-gray-500">
                  {album.release_date.split("-")[0]} • Album
                </p>
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="mb-4 text-2xl font-bold tracking-tight">
              Fans also like
            </p>
            <button
              className="mt-2 text-sm text-gray-500 transition-colors hover:text-white"
              onClick={handleSeeMoreAlbums}
            >
              See {albumsLimit === 5 ? "more" : "less"}
            </button>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6">
            {relatedArtists.artists.slice(0, albumsLimit).map((artist) => (
              <a className="p-4 bg-gray-400 rounded-md bg-opacity-10">
                <Image
                  className="object-cover w-full mb-4 rounded-full aspect-square"
                  src={artist.images[0].url}
                  alt={artist.name}
                  width={180}
                  height={180}
                />
                <p className="mb-1 truncate">{artist.name}</p>
                <p className="text-sm font-normal text-gray-500">Artist</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
