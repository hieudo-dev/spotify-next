import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import TracksTable from "~components/TracksTable";
import { getAlbum } from "~utils/api";
import { decodeURIs, msToEstimatedTime } from "~utils/functions";

export default function AlbumDetails() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { data: album } = useQuery({
    queryKey: ["album", id],
    queryFn: async () => {
      return session
        ? getAlbum({ id, accessToken: session.accessToken })
        : null;
    },
  });

  if (!album?.tracks || !session) return null;

  const totalPlaytime = msToEstimatedTime(
    album.tracks.items.reduce((acc, track) => acc + track.duration_ms, 0)
  );

  return (
    <>
      <section className="flex items-end px-8 pt-4 pb-6">
        <Image
          className="mr-6 shadow-3xl"
          src={album.images[0].url}
          alt={album.name}
          width={224}
          height={224}
        />
        <div className="flex flex-col justify-end">
          <p className="mb-4 text-sm capitalize">{album.type}</p>
          {/* TODO: Implement auto-scale font to fit 1 line */}
          <h1 className="mb-6 text-5xl font-bold">{album.name}</h1>
          <div
            className="text-sm font-thin text-slate-300"
            dangerouslySetInnerHTML={{
              __html: "",
            }}
          ></div>
          <div className="flex items-center pt-2 text-sm">
            <Image
              src={session.user.image}
              height={22}
              width={22}
              alt={session.user.name}
              className="mr-1 rounded-full"
            />
            <Link
              href={decodeURIs(album.artists[0].uri)}
              className="block font-bold"
            >
              {session.user.name}
            </Link>
            <p className="font-thin metadata">
              {album.release_date.split("-")[0]}
            </p>
            {album.total_tracks ? (
              <>
                <p className="font-thin metadata">
                  {album.total_tracks} songs,
                </p>
                <p className="font-thin leading-normal text-slate-400">
                  &nbsp;about {totalPlaytime}
                </p>
              </>
            ) : null}
          </div>
        </div>
      </section>
      <div className="flex-1 backdrop-blur-3xl to-slate-950 to-[400px] from-slate-800 bg-gradient-to-b bg-opacity-10">
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
        <TracksTable playlist={album} />
      </div>
    </>
  );
}
