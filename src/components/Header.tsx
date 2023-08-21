import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session, status } = useSession();
  if (!session) return null;

  return (
    <header
      id="header"
      className="sticky top-0 z-10 flex justify-between w-full px-8 py-4"
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
      <div className="text-sm flex p-[2px] items-center pr-2 bg-gray-800 rounded-full">
        <Image
          src={session.user.image}
          height={28}
          width={28}
          alt={session.user.name}
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
