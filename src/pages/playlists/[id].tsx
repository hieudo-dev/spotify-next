import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import TracksTable from "~components/TracksTable";
import TracksTableHeader from "~components/TracksTableHeader";
import { getPlaylist } from "~utils/api";

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

  return (
    <>
      <TracksTableHeader playlist={playlist} />
      <div className="flex-1 backdrop-blur-3xl to-black to-[400px] from-gray-800 bg-gradient-to-b bg-opacity-10">
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
        <TracksTable playlist={playlist} />
      </div>
    </>
  );
}
