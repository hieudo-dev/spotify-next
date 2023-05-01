import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PlayIcon from "~assets/icons/play.svg";
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
      <div className="backdrop-blur-3xl to-slate-950 to-[400px] from-slate-800 bg-gradient-to-b bg-opacity-10">
        <div className="px-8 py-4">
          <button
            type="button"
            className="transition-transform hover:scale-105"
          >
            <PlayIcon className="p-4 text-black bg-green-500 rounded-full w-14 h-14" />
          </button>
        </div>
        <TracksTable playlist={playlist} />
      </div>
    </>
  );
}
