import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { startPlayback } from "~utils/api";

const PlayButton = ({ className = "", wrapperClassName = "", contextUri }) => {
  const { data: session } = useSession();
  const { mutate: play } = useMutation({
    mutationFn: (contextUri: string) =>
      startPlayback({ accessToken: session?.accessToken, contextUri }),
  });

  const handleClick = (e) => {
    e.preventDefault();
    play(contextUri);
  };

  return (
    <button type="button" className={wrapperClassName} onClick={handleClick}>
      <FontAwesomeIcon
        icon={faPlay}
        className={clsx(
          "transition-all hover:scale-105 w-5 h-5 p-4 text-black bg-green-500 rounded-full",
          className
        )}
      />
    </button>
  );
};

export default PlayButton;
