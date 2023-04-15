import Image from "next/image";
import ChevronLeftIcon from "../public/icons/chevron-left.svg";
import ChevronRightIcon from "../public/icons/chevron-right.svg";

export default function Header() {
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
          src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1787809214777892&height=300&width=300&ext=1684155478&hash=AeSAtMJwfPNyDC1oFpA"
          height={28}
          width={28}
          alt="Hieu"
          className="mr-2 rounded-full"
        />
        <p className="text-sm">Hieu</p>
      </div>
    </header>
  );
}
