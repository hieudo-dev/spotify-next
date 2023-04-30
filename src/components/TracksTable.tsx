import Image from "next/image";
import Link from "next/link";
import ClockIcon from "~assets/icons/clock.svg";
import { decodeURIs, msToPlayTime } from "~utils/functions";

export default function TracksTable({ playlist }) {
  return (
    <section className="grid pt-2 pb-16 text-slate-400 grid-cols-[auto_40%_repeat(3,minmax(0,1fr))] grid-rows-[24px_1px_minmax(0,1fr)] gap-2 items-center px-8">
      <div className="[&>*]:sticky [&>*]:top-16 text-sm font-thin contents">
        <div className="px-4 text-center">#</div>
        <div>Title</div>
        <div>Album</div>
        <div>Date added</div>
        <ClockIcon className="mr-6 place-self-end" />
      </div>
      <div className="col-[1/-1] border-b-[1px] border-slate-700 border-solid sticky top-[94px]"></div>

      {playlist.tracks.items.map(({ track, added_by, added_at }, index) => (
        <div key={track.uri} className="text-sm font-thin cur contents">
          <td className="px-4 text-center">{index + 1}</td>
          <td>
            <div className="flex items-center">
              <Image
                src={track.album.images[0].url}
                alt={track.name}
                width={40}
                height={40}
              />
              <div className="ml-4">
                <div className="text-base font-normal text-slate-300">
                  {track.name}
                </div>
                <div>
                  {track.artists.map((artist, index) => (
                    <Link
                      key={artist.uri}
                      href={decodeURIs(artist.uri)}
                      className="hover:underline"
                    >
                      {artist.name}
                      {index < track.artists.length - 1 ? ", " : ""}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </td>
          <Link href={decodeURIs(track.album.uri)} className="hover:underline">
            {track.album.name}
          </Link>
          <div>{added_by.id ? new Date(added_at).toLocaleString() : ""}</div>
          <div className="mr-6 place-self-end">
            {msToPlayTime(track.duration_ms)}
          </div>
        </div>
      ))}
    </section>
  );
}
