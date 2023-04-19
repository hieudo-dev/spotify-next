import { useSession } from "next-auth/react";
import Image from "next/image";
import ChevronLeftIcon from "~assets/icons/chevron-left.svg";
import ChevronRightIcon from "~assets/icons/chevron-right.svg";

export default function Header() {
  const { data: session } = useSession();
  if (!session) return null;

  return (
    <header className="flex justify-between px-8 py-4">
      <div className="flex gap-4">
        <button
          type="button"
          className="p-2 bg-gray-800 rounded-full"
          onClick={() => window.history.back()}
        >
          <ChevronLeftIcon className="text-white" />
        </button>
        <button
          type="button"
          className="p-2 bg-gray-800 rounded-full"
          onClick={() => window.history.forward()}
        >
          <ChevronRightIcon className="text-white" />
        </button>
      </div>
      <div className="flex p-[2px] items-center pr-2 bg-gray-800 rounded-full">
        <Image
          src={session.user.image}
          height={28}
          width={28}
          alt={session.user.name}
          className="mr-2 rounded-full"
        />
        <p className="text-sm">{session.user.name}</p>
      </div>
    </header>
  );
}
