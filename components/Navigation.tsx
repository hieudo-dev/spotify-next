import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from "../public/icons/home.svg";
import LibraryIcon from "../public/icons/library.svg";
import SearchIcon from "../public/icons/search.svg";
import SpotifyLogo from "../public/icons/spotify.svg";

export default function Navigation() {
  const router = useRouter();
  return (
    <nav className="pt-6 w-80">
      <a className="block mx-6 mb-6" href="/">
        <SpotifyLogo className="h-[50px] w-40" />
      </a>
      <ul className="px-2">
        <li className="px-4 py-2">
          <Link href="/" draggable="false" className="flex items-center">
            <HomeIcon className="w-6 h-6 mr-4 text-slate-100" />
            Home
          </Link>
        </li>
        <li className="flex px-4 py-2 text-gray-500">
          <Link href="/search" draggable="false" className="flex items-center">
            <SearchIcon className="w-6 h-6 mr-4" />
            Search
          </Link>
        </li>
        <li className="flex px-4 py-2 text-gray-500">
          <Link href="/library" draggable="false" className="flex items-center">
            <LibraryIcon className="w-6 h-6 mr-4" />
            Your Library
          </Link>
        </li>
      </ul>
    </nav>
  );
}
