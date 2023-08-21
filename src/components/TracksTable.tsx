import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { decodeURIs, msToPlayTime } from "~utils/functions";

export default function TracksTable({ playlist }) {
  const HEADER_HEIGHT = 64;
  const [headerSticky, setHeaderSticky] = useState(false);
  const tableHeaderRef = useRef(null);
  const tracks = useMemo(() => {
    const tracks = playlist.tracks?.items ?? playlist.items;
    return tracks.map(({ track, ...rest }) => ({ ...rest, ...track }));
  }, [playlist]);
  const hasAlbumData = useMemo(() => {
    return tracks.some((track) => !!track.album);
  }, [tracks]);
  const tableColClasses = hasAlbumData
    ? "grid-cols-[auto_40%_repeat(2,minmax(0,1fr))_120px]"
    : "grid-cols-[80px_auto_120px]";

  useEffect(() => {
    const handleScroll = () => {
      const tableHeader = tableHeaderRef.current;
      // Detect whether table header is sticking to the top of the screen or not
      setHeaderSticky(
        tableHeader?.getBoundingClientRect().top === HEADER_HEIGHT
      );
    };
    document.querySelector("main").addEventListener("scroll", handleScroll);
    return () => {
      document
        .querySelector("main")
        .removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className={
        "grid pb-16 text-slate-400 grid-rows-[24px_calc(1px+1em)_minmax(0,1fr)] items-center px-8 " +
        tableColClasses
      }
    >
      <div
        className={clsx(
          "[&>*]:sticky [&>*]:py-2 [&>*]:top-16 text-sm font-thin contents",
          { "[&>*]:bg-gray-900": headerSticky }
        )}
      >
        <div className="pr-4 pl-[calc(1em+32px)] text-center -ml-8">#</div>
        <div ref={tableHeaderRef}>Title</div>
        {!!hasAlbumData && (
          <>
            <div className="px-4">Album</div>
            <div className="px-4">Date added</div>
          </>
        )}
        <div className="relative -mr-8">
          <FontAwesomeIcon icon={faClock} className="ml-[90px]" />
        </div>
      </div>
      <div
        className={clsx(
          "col-[1/-1] my-2 border-b-[1px] border-slate-700 border-solid sticky top-[100px]",
          { "-mx-8": headerSticky }
        )}
      ></div>

      {tracks.map((track, index) => (
        <div key={track.uri} className="text-sm font-thin cur contents">
          <div className="px-4 text-center">{index + 1}</div>
          <div>
            <div className="flex items-center">
              {!!hasAlbumData && (
                <Image
                  src={track.album.images[0].url}
                  alt={track.name}
                  width={40}
                  height={40}
                />
              )}
              <div className={hasAlbumData ? "ml-4" : ""}>
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
          </div>
          {!!hasAlbumData && (
            <>
              <Link
                href={decodeURIs(track.album.uri)}
                className="px-4 hover:underline"
              >
                {track.album.name}
              </Link>
              <div className="px-4">
                {track.added_by?.id !== null
                  ? new Date(track.added_at).toLocaleString()
                  : ""}
              </div>
            </>
          )}
          <div className="mx-4 place-self-end">
            {msToPlayTime(track.duration_ms)}
          </div>
        </div>
      ))}
    </section>
  );
}
