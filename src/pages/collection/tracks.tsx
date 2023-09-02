import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import PlayButton from "~components/PlayButton";
import TracksTable from "~components/TracksTable";
import { getSavedTracks } from "~utils/api";
import { savedTracksMetadata } from "~utils/constants";
import {
  decodeURIs,
  getLikedSongsURI,
  msToEstimatedTime,
} from "~utils/functions";

export default function LikedSongs() {
  const { data: session } = useSession();
  const { data: playlist } = useQuery({
    queryKey: ["saved-tracks", session?.accessToken],
    queryFn: async () => {
      if (!session) {
        return null;
      }

      return Object.assign(
        {},
        savedTracksMetadata,
        await getSavedTracks({ accessToken: session.accessToken })
      );
    },
  });

  if (!playlist?.items) return null;

  const totalPlaytime = msToEstimatedTime(
    (playlist.tracks?.items ?? playlist.items).reduce(
      (acc, track) => acc + track.track.duration_ms,
      0
    )
  );

  return (
    <>
      <section className="flex items-end px-8 pt-4 pb-6">
        <Image
          className="mr-6 shadow-3xl"
          src="/images/liked-songs.png"
          alt={playlist.name}
          width={224}
          height={224}
        />
        <div className="flex flex-col justify-end">
          <p className="mb-4 text-sm capitalize">Playlist</p>
          {/* TODO: Implement auto-scale font to fit 1 line */}
          <h1 className="mb-6 text-5xl font-bold">Liked Songs</h1>
          <div className="flex items-center pt-2 text-sm">
            <Image
              src={session.user.image}
              height={22}
              width={22}
              alt={session.user.name}
              className="mr-1 rounded-full"
            />
            <Link
              href={decodeURIs(playlist.owner.uri)}
              className="block font-bold"
            >
              {session.user.name}
            </Link>
            {playlist.followers.total ? (
              <p className="font-thin metadata">
                {playlist.followers.total} likes
              </p>
            ) : null}
            {playlist.total ? (
              <>
                <p className="font-thin metadata">{playlist.total} songs,</p>
                <p className="font-thin leading-normal text-slate-400">
                  &nbsp;about {totalPlaytime}
                </p>
              </>
            ) : null}
          </div>
        </div>
      </section>
      <div className="flex-1 backdrop-blur-3xl to-slate-950 to-[400px] from-slate-800 bg-gradient-to-b bg-opacity-10">
        <PlayButton
          contextUri={getLikedSongsURI(session?.user)}
          className="mx-8 my-4"
        />
        <TracksTable playlist={playlist} />
      </div>
    </>
  );
}
