export function decodeURIs(content: string) {
  return content
    .replaceAll("spotify:playlist:", "/playlists/")
    .replaceAll("spotify:user:", "/user/");
}

export const msToEstimatedTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const hours = Math.floor(minutes / 60);
  const timeAmount = hours > 0 ? hours : minutes;
  const timeUnit = hours > 0 ? "hr" : "min";
  return `${timeAmount} ${timeUnit}`;
};
