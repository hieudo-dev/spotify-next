import { OwnerType, Playlist } from "~types/index";

export const savedTracksMetadata: Partial<Playlist> = {
  description: "",
  owner: {
    uri: "",
    href: "",
    id: "",
    external_urls: {
      spotify: "",
    },
    type: OwnerType.User,
  },
  followers: {
    total: 0,
    href: null,
  },
};
