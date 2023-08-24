import {
  faCirclePause,
  faCirclePlay,
  faRepeat,
  faShuffle,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getCurrentlyPlaying, transferPlayback } from "~utils/api";
import { decodeURIs } from "~utils/functions";

export function NowPlayingBar() {
  const [player, setPlayer] = useState(undefined);
  const [trackId, setTrackId] = useState(undefined);
  const [paused, setPaused] = useState(undefined);
  const [deviceId, setDeviceId] = useState(undefined);
  const [active, setActive] = useState(false);
  const { data: session } = useSession();

  const { data: playingContext } = useQuery({
    queryKey: ["playingContext", trackId, session?.accessToken],
    queryFn: () => {
      return session
        ? getCurrentlyPlaying({ accessToken: session.accessToken })
        : null;
    },
  });

  useEffect(() => {
    const accessToken = session?.accessToken;
    if (!accessToken || player) return;

    // @ts-ignore
    const newPlayer = new window.Spotify.Player({
      name: "Spotify-next",
      getOAuthToken: (cb) => cb(accessToken),
      volume: 0.3,
    });
    setPlayer(newPlayer);

    newPlayer.addListener("ready", ({ device_id }) => {
      console.info("Ready with Device ID", device_id);
      setDeviceId(device_id);
      transferPlayback({
        accessToken,
        deviceId: device_id,
      });
    });

    newPlayer.addListener("player_state_changed", (state) => {
      if (!state) {
        return;
      }

      if (!state.track_window.current_track.id) {
        transferPlayback({
          accessToken: session?.accessToken,
          deviceId,
        });
        return;
      }

      setTrackId(state.track_window.current_track.id);
      setPaused(state.paused);

      newPlayer.getCurrentState().then((state) => {
        !state ? setActive(false) : setActive(true);
      });
    });
    newPlayer.connect();
  }, [session]);

  const track = playingContext?.item;

  return (
    <footer className="flex items-center justify-between h-[80px] px-4">
      {track && (
        <div className="flex w-1/3">
          <Image
            src={track.album.images[0].url}
            height={48}
            width={48}
            alt={track.name}
            className="mr-6"
          ></Image>
          <div>
            <Link
              href={decodeURIs(track.uri)}
              className="text-sm font-light hover:underline"
            >
              {track.name}
            </Link>
            <div className="text-[0.7em] font-light text-gray-400 height">
              {track.artists.flatMap((artist, index) => [
                <Link href={decodeURIs(track.uri)}>{artist.name}</Link>,
                index < track.artists.length - 1 ? ", " : "",
              ])}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center">
        <button onClick={() => player.previousTrack()}>
          <FontAwesomeIcon
            icon={faShuffle}
            className="h-5 mr-5 text-gray-400"
          />
        </button>
        <button onClick={() => player.previousTrack()}>
          <FontAwesomeIcon
            icon={faStepBackward}
            className="h-5 text-gray-400"
          />
        </button>
        <button className="mx-5" onClick={() => player.togglePlay()}>
          <FontAwesomeIcon
            icon={paused ? faCirclePlay : faCirclePause}
            className="h-8 text-white"
          />
        </button>
        <button onClick={() => player.nextTrack()}>
          <FontAwesomeIcon icon={faStepForward} className="h-5 text-gray-400" />
        </button>
        <button onClick={() => player.previousTrack()}>
          <FontAwesomeIcon icon={faRepeat} className="h-5 ml-5 text-gray-400" />
        </button>
      </div>

      <div className="w-1/3"></div>
    </footer>
  );
}
