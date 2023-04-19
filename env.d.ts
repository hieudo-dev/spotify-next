import { Session } from "next-auth";

namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SPOTIFY_BASE_API: string;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: Session["user"] & {
      id: string;
    };
  }
}
