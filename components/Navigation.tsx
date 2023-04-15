import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import AddIcon from "../public/icons/add.svg";
import BookmarkIcon from "../public/icons/bookmark.svg";
import HeartIcon from "../public/icons/heart.svg";
import HomeIcon from "../public/icons/home.svg";
import LibraryIcon from "../public/icons/library.svg";
import SearchIcon from "../public/icons/search.svg";
import SpotifyLogo from "../public/icons/spotify.svg";

export default function Navigation() {
  const router = useRouter();
  const playlists = Array.from(Array(20).keys()).map((_, index) => ({
    id: index,
    name: "Your Top Songs 2022 " + (index + 1),
    description: "New music for you",
  }));

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

  return (
    <nav className="flex flex-col pt-6 b-white w-80">
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
          {playlists.map(({ id, name, description }) => (
            <li
              key={id}
              className="px-4 py-2 text-sm font-light transition-opacity opacity-70 hover:opacity-100"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
