import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getPlaylist } from "~utils/api";
import { decodeURIs, msToEstimatedTime } from "~utils/functions";

export default function PlaylistDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const { data: playlist } = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => {
      return session
        ? getPlaylist({ id, accessToken: session.accessToken })
        : null;
    },
  });

  if (!playlist) return null;

  const totalPlaytime = msToEstimatedTime(
    playlist.tracks.items.reduce(
      (acc, track) => acc + track.track.duration_ms,
      0
    )
  );

  return (
    <section className="h-full">
      <div className="flex items-end px-8 pt-4 pb-6">
        <Image
          className="mr-6 shadow-3xl"
          src={playlist.images[0].url}
          alt={playlist.name}
          width={224}
          height={224}
        />
        <div className="flex flex-col justify-end">
          <p className="mb-4 text-sm capitalize">{playlist.type}</p>
          {/* TODO: Implement auto-scale font to fit 1 line */}
          <h1 className="mb-6 text-5xl font-bold">{playlist.name}</h1>
          <div
            className="text-sm font-thin text-slate-300"
            dangerouslySetInnerHTML={{
              __html: decodeURIs(playlist.description),
            }}
          ></div>
          <div className="flex items-center pt-2 text-sm">
            <Link
              href={decodeURIs(playlist.owner.uri)}
              className="block font-bold metadata"
            >
              {playlist.owner.display_name}
            </Link>
            {playlist.followers.total ? (
              <p className="font-thin metadata">
                {playlist.followers.total} likes
              </p>
            ) : null}
            {playlist.tracks.total ? (
              <>
                <p className="font-thin metadata">
                  {playlist.tracks.total} songs,
                </p>
                <p className="font-thin text-slate-400">
                  &nbsp;about {totalPlaytime}
                </p>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="h-full backdrop-blur-3xl to-slate-950 from-slate-800 bg-gradient-to-b bg-opacity-10"></div>
    </section>
  );
}
