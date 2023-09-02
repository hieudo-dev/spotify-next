import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import PlayButton from "~components/PlayButton";
import { getFeaturedPlaylists, getNewReleases, getPlaylists } from "~utils/api";
import { decodeURIs } from "~utils/functions";

export default function Home() {
  const timeOfDay = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    if (hour >= 18 && hour < 22) return "evening";
    return "night";
  }, []);

  const { data: session } = useSession();
  const { data: playlists } = useQuery({
    queryKey: ["playlists", session?.user.id, session?.accessToken],
    queryFn: async function () {
      return session
        ? await getPlaylists({ accessToken: session.accessToken })
        : null;
    },
  });

  const { data: featuredPlaylists } = useQuery({
    queryKey: ["featured-playlists", session?.accessToken],
    queryFn: async function () {
      return session
        ? await getFeaturedPlaylists({ accessToken: session.accessToken })
        : null;
    },
  });

  const { data: newReleases } = useQuery({
    queryKey: ["new-releases", session?.accessToken],
    queryFn: async function () {
      return session
        ? await getNewReleases({ accessToken: session.accessToken })
        : null;
    },
  });

  if (!playlists || !featuredPlaylists || !newReleases) return null;

  return (
    <>
      <section className="px-8 pt-4 pb-6">
        <h2 className="mb-6 text-3xl font-medium">Good {timeOfDay}</h2>
        <div className="grid grid-cols-3 mb-8 gap-y-4 gap-x-8 ">
          {playlists.items?.slice(0, 6).map((playlist) => {
            return (
              <Link
                key={playlist.id}
                href={decodeURIs(playlist.uri)}
                className="flex h-20 overflow-hidden transition-colors duration-300 bg-white rounded-lg hover:bg-opacity-25 [&:hover_svg]:opacity-100 bg-opacity-10"
              >
                <Image
                  className="w-full max-w-fit aspect-square"
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  width={80}
                  height={80}
                />
                <div className="flex flex-1 p-4">
                  <p className="font-medium line-clamp-2 place-self-center">
                    {playlist.name}
                  </p>
                </div>
                <PlayButton
                  wrapperClassName="mr-2"
                  className="opacity-0 scale-[80%] hover:scale-90"
                  contextUri={playlist.uri}
                />
              </Link>
            );
          })}
        </div>

        <h2 className="mb-4 text-xl font-medium">
          {featuredPlaylists.message}
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-6 mb-10">
          {featuredPlaylists.playlists?.items.slice(0, 5).map((playlist) => (
            <Link
              key={playlist.uri}
              href={decodeURIs(playlist.uri)}
              className="p-4 transition-all media-card [&:hover_svg]:opacity-100 [&:hover_svg]:translate-y-0"
            >
              <div className="relative">
                <Image
                  className="w-full mb-4 rounded-md"
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  width={180}
                  height={180}
                />
                <PlayButton
                  wrapperClassName="absolute bottom-0 right-0"
                  className="opacity-0 scale-[80%] hover:scale-90 translate-y-2"
                  contextUri={playlist.uri}
                />
              </div>
              <p className="mb-1 truncate">{playlist.name}</p>
              <p className="text-sm font-normal text-gray-400 line-clamp-2">
                {playlist.description}
              </p>
            </Link>
          ))}
        </div>

        <h2 className="mb-4 text-xl font-medium">New Releases</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-6 mb-10">
          {newReleases.albums?.items.slice(0, 5).map((album) => (
            <Link
              key={album.uri}
              href={decodeURIs(album.uri)}
              className="p-4 transition-all media-card [&:hover_svg]:opacity-100 [&:hover_svg]:translate-y-0"
            >
              <div className="relative">
                <Image
                  className="w-full mb-4 rounded-md"
                  src={album.images[0].url}
                  alt={album.name}
                  width={180}
                  height={180}
                />
                <PlayButton
                  wrapperClassName="absolute bottom-0 right-0"
                  className="opacity-0 scale-[80%] hover:scale-90 translate-y-2"
                  contextUri={album.uri}
                />
              </div>
              <p className="mb-1 truncate">{album.name}</p>
              <p className="text-sm font-normal text-gray-400 line-clamp-2">
                {album.artists[0].name}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
