import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import AddIcon from "~assets/icons/add.svg";
import BookmarkIcon from "~assets/icons/bookmark.svg";
import HeartIcon from "~assets/icons/heart.svg";
import HomeIcon from "~assets/icons/home.svg";
import LibraryIcon from "~assets/icons/library.svg";
import SearchIcon from "~assets/icons/search.svg";
import SpotifyLogo from "~assets/icons/spotify.svg";
import { getPlaylists } from "~utils/api";

export default function Navigation() {
  const router = useRouter();
  const links = useMemo(
    () => [
      {
        path: "/",
        label: "Home",
        Icon: HomeIcon,
      },
      {
        path: "/search",
        label: "Search",
        Icon: SearchIcon,
      },
      {
        path: "/collection/playlists",
        label: "Your Library",
        Icon: LibraryIcon,
      },
    ],
    []
  );
  const libraryLinks = useMemo(
    () => [
      {
        path: "/playlists/new",
        Icon: AddIcon,
        label: "Create Playlist",
        className: "text-black bg-gray-100",
      },
      {
        path: "/collection/tracks",
        Icon: HeartIcon,
        label: "Liked Songs",
        className:
          "bg-gradient-to-br from-[#450af5] to-[#c4efd9] text-grey-100",
      },
      {
        path: "/collection/episodes",
        Icon: BookmarkIcon,
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
      <a className="block mx-6 mb-6 text-white" href="/">
        <SpotifyLogo className="h-[50px] w-40" />
      </a>
      <ul className="px-2 mb-6">
        {links.map(({ path, label, Icon }) => (
          <li key={path} className="px-4 py-2">
            <Link
              href={path}
              draggable="false"
              className={
                "flex items-center text-sm transition-opacity hover:opacity-100 " +
                (router.pathname === path ? "opacity-100" : "opacity-70")
              }
            >
              <Icon className="w-6 h-6 mr-4" />
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="px-2">
        {libraryLinks.map(({ path, label, Icon, className }) => (
          <li key={path} className="px-4 py-2">
            <Link
              href={path}
              draggable="false"
              className={
                "flex items-center text-sm font-normal transition-opacity hover:opacity-100 " +
                (router.pathname === path ? "opacity-100" : "opacity-70")
              }
            >
              <div className={"p-1 mr-4 bg-gray-300 rounded-sm " + className}>
                <Icon className="w-4 h-4" />
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
            : playlists.items.map(({ id, name }) => (
                <Link
                  key={id}
                  href={`/playlists/${id}`}
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
