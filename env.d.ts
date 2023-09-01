import { Session } from "next-auth";

namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SPOTIFY_BASE_API: string;
  }
}

declare module "next-auth" {
  interface Session {
    error: string;
    accessToken: string;
    user: Session["user"] & {
      id: string;
    };
  }

  interface Account {
    expires_in: number;
  }
}
