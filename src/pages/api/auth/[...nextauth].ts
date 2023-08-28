import NextAuth, { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const SCOPE = [
  "streaming",
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-library-modify",
  "playlist-read-private",
  "user-top-read",
].join(" ");

export const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_SECRET,
      authorization:
        "https://accounts.spotify.com/authorize?show_dialog=true&scope=" +
        encodeURI(SCOPE),
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.userId as string;
      return session;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.userId = user.id;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
