import {
  faCirclePause,
  faCirclePlay,
  faRepeat,
  faShuffle,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTrack, transferPlayback as transferPlaybackApi } from "~utils/api";
import { decodeURIs } from "~utils/functions";

export function NowPlayingBar() {
  const [player, setPlayer] = useState(undefined);
  const [trackId, setTrackId] = useState(undefined);
  const [paused, setPaused] = useState(true);
  const [deviceId, setDeviceId] = useState(undefined);
  const [active, setActive] = useState(false);
  const { data: session } = useSession();

  const { mutate: transferPlayback } = useMutation({
    mutationFn: (deviceId) =>
      transferPlaybackApi({ accessToken: session?.accessToken, deviceId }),
  });
  const { data: track } = useQuery({
    queryKey: ["track", trackId],
    queryFn: () => {
      return session
        ? getTrack({ id: trackId, accessToken: session.accessToken })
        : null;
    },
    keepPreviousData: true,
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
    });

    newPlayer.addListener("player_state_changed", (state) => {
      if (!state) {
        return;
      }

      if (!state.track_window.current_track.id) {
        transferPlayback(deviceId);
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

  useEffect(() => {
    if (deviceId) transferPlayback(deviceId);
  }, [deviceId]);

  const handleTogglePlay = () => {
    if (paused) {
      transferPlayback(deviceId);
    }
    player.togglePlay();
  };

  return (
    <footer className="flex items-center justify-between h-[80px] px-4">
      <div className="flex w-1/3">
        {track && (
          <>
            <Image
              src={track.album.images[0].url}
              height={48}
              width={48}
              alt={track.name}
              className="mr-6"
            ></Image>
            <div>
              <p className="text-sm font-light">{track.name}</p>
              <div className="text-[0.7em] font-light text-gray-400 height">
                {track.artists.flatMap((artist, index) => [
                  <Link
                    key={artist.uri}
                    href={decodeURIs(artist.uri)}
                    className="hover:underline"
                  >
                    {artist.name}
                  </Link>,
                  index < track.artists.length - 1 ? ", " : "",
                ])}
              </div>
            </div>
          </>
        )}
      </div>

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
        <button
          className="mx-5 transition-transform hover:scale-110"
          onClick={handleTogglePlay}
        >
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
