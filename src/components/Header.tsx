import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HEADER_HEIGHT } from "~types";

export default function Header() {
  const headerRef = useRef(null);
  const [opacity, setOpacity] = useState("0");
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const top = document.querySelector("main")?.scrollTop ?? 0;
      const opacity = Math.min(
        Math.floor(
          (Math.max(top - HEADER_HEIGHT, 0) * 100) / (HEADER_HEIGHT * 3)
        ),
        100
      );
      setOpacity(opacity === 100 ? "1" : `.${opacity}`);
    };
    document.querySelector("main").addEventListener("scroll", handleScroll);

    return () =>
      document
        .querySelector("main")
        .removeEventListener("scroll", handleScroll);
  });

  if (!session) return null;

  return (
    <header
      ref={headerRef}
      className={clsx(
        "sticky top-0 z-10 flex justify-between w-full px-8 py-4",
        `bg-gray-700/[${opacity}]`
      )}
    >
      <div className="flex gap-3">
        <button
          type="button"
          className="w-8 h-8 bg-gray-800 rounded-full"
          onClick={() => window.history.back()}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
        </button>
        <button
          type="button"
          className="w-8 h-8 bg-gray-800 rounded-full"
          onClick={() => window.history.forward()}
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-white" />
        </button>
      </div>
      <div className="text-sm flex p-4 items-center pr-2 bg-gray-800 rounded-full">
        <Image
          src={session?.user?.image}
          height={28}
          width={28}
          alt={session?.user?.name}
          className="mr-2 rounded-full"
        />
        <p>{session.user.name}</p>&nbsp;|&nbsp;
        {status === "unauthenticated" ? (
          <button type="button" onClick={() => signIn()}>
            Sign in
          </button>
        ) : (
          <button type="button" onClick={() => signOut()}>
            Sign out
          </button>
        )}
      </div>
    </header>
  );
}
