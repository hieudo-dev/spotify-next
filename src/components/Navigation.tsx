import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import {
  faAdd,
  faBook,
  faBookmark,
  faHeart,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { getPlaylists } from "~utils/api";
import { decodeURIs } from "~utils/functions";

export default function Navigation() {
  const router = useRouter();
  const links = useMemo(
    () => [
      {
        path: "/",
        label: "Home",
        icon: faHome,
      },
      {
        path: "/search",
        label: "Search",
        icon: faSearch,
      },
      {
        path: "/collection/playlists",
        label: "Your Library",
        icon: faBook,
      },
    ],
    []
  );
  const libraryLinks = useMemo(
    () => [
      {
        path: "/playlists/new",
        icon: faAdd,
        label: "Create Playlist",
        className: "text-black bg-gray-100",
      },
      {
        path: "/collection/tracks",
        icon: faHeart,
        label: "Liked Songs",
        className:
          "bg-gradient-to-br from-[#450af5] to-[#c4efd9] text-grey-100",
      },
      {
        path: "/collection/episodes",
        icon: faBookmark,
        label: "Episodes",
        className: "bg-green-700 text-green-500",
      },
    ],
    []
  );

  const { data: session } = useSession();
  const { data: playlists, isLoading } = useQuery({
    queryKey: ["playlists", session?.user.id, session?.accessToken],
    queryFn: async function () {
      return session
        ? await getPlaylists({ accessToken: session.accessToken })
        : null;
    },
  });

  return (
    <nav className="flex flex-col max-w-[256px] pt-6 b-white min-w-[256px]">
      <a className="flex items-center mx-6 mb-6 text-white" href="/">
        {/* <SpotifyLogo className="h-[50px] w-40" /> */}
        <FontAwesomeIcon icon={faSpotify} className="h-[50px] mr-4" />
        <span className="text-3xl font-normal leading-snug tracking-tight">
          Spotify
        </span>
      </a>
      <ul className="px-2 mb-6">
        {links.map(({ path, label, icon }) => (
          <li key={path} className="px-4 py-2">
            <Link
              href={path}
              draggable="false"
              className={
                "flex items-center text-sm transition-opacity hover:opacity-100 " +
                (router.pathname === path ? "opacity-100" : "opacity-70")
              }
            >
              <FontAwesomeIcon icon={icon} className="w-6 h-6 mr-4" />
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="px-2">
        {libraryLinks.map(({ path, label, icon, className }) => (
          <li key={path} className="px-4 py-2">
            <Link
              href={path}
              draggable="false"
              className={
                "flex items-center text-sm font-normal transition-opacity hover:opacity-100 " +
                (router.pathname === path ? "opacity-100" : "opacity-70")
              }
            >
              <div
                className={"flex p-1 mr-4 bg-gray-300 rounded-sm " + className}
              >
                <FontAwesomeIcon icon={icon} className="w-4 h-4" />
              </div>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="relative z-10 px-6 pt-3">
        <hr className="border-gray-700" />
        <div className="absolute left-3 right-3 h-5 bg-gradient-to-b from-[rgba(0,0,0,0.9)] to-[transparent]"></div>
      </div>

      <div className="flex-1 p-2 overflow-auto scrollbar">
        <ul>
          {isLoading || !playlists?.items
            ? null
            : playlists.items.map(({ id, uri, name }) => (
                <Link
                  key={id}
                  href={decodeURIs(uri)}
                  className="block px-4 py-2 overflow-hidden text-sm font-light transition-opacity cursor-pointer whitespace-nowrap max-h-9 text-ellipsis opacity-70 hover:opacity-100"
                >
                  {name}
                </Link>
              ))}
        </ul>
      </div>
    </nav>
  );
}
