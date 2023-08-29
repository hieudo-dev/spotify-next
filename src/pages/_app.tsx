import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Link from "next/link";
import "~assets/styles/globals.css";
import Header from "~components/Header";
import Navigation from "~components/Navigation";
import { NowPlayingBar } from "~components/NowPlayingBar";

// Disables insertion of style tags into head. Reference: https://fontawesome.com/docs/web/use-with/react/use-with
config.autoAddCss = false;

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col h-screen max-h-screen font-sans bg-black text-slate-200">
          <div className="flex flex-1 h-[calc(100%-160px)]">
            <Navigation />
            <main className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-gray-700 scrollbar">
              <Header />
              <Component {...pageProps} />
            </main>
          </div>
          <NowPlayingBar />
          <div className="flex justify-between p-4 bg-[linear-gradient(90deg,#af2896,#509bf5)]">
            <div>
              <p className="font-serif text-xs tracking-widest text-gray-300">
                PREVIEW OF SPOTIFY
              </p>
              <p>
                This is a clone website, not for profit/commercial purposes. Go
                to open.spotify.com to enjoy the full experience.{" "}
              </p>
            </div>
            <Link
              href="https://open.spotify.com"
              className="h-full px-10 leading-10 text-gray-900 bg-white rounded-full place-self-center"
            >
              Explore
            </Link>
          </div>
        </div>
      </QueryClientProvider>
    </SessionProvider>
  );
}
