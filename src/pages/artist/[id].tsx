import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getArtist } from "~utils/api";

export default function PlaylistDetail() {
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

  if (!artist) return null;

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
      <div className="h-full backdrop-blur-3xl to-black to-[400px] from-gray-800 bg-gradient-to-b bg-opacity-10">
        <div className="px-8 py-4">
          <button
            type="button"
            className="transition-transform hover:scale-105"
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="w-5 h-5 p-4 text-black bg-green-500 rounded-full"
            />
          </button>
        </div>
      </div>
    </>
  );
}
