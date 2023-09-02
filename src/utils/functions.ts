import { User } from "next-auth";

export function decodeURIs(content: string) {
  return content.replaceAll(/spotify:(.*?):/g, "/$1/");
}

export const msToEstimatedTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const hours = Math.floor(minutes / 60);
  const timeAmount = hours > 0 ? hours : minutes;
  const timeUnit = hours > 0 ? "hr" : "min";
  return `${timeAmount} ${timeUnit}`;
};

export const msToPlayTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
};

export const getLikedSongsURI = (user: User) => {
  return `spotify:user:${user.id}:collection`;
};
