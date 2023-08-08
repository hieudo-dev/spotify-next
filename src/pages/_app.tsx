import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "~assets/styles/globals.css";
import Header from "~components/Header";
import Navigation from "~components/Navigation";

// Disables insertion of style tags into head. Reference: https://fontawesome.com/docs/web/use-with/react/use-with
config.autoAddCss = false;

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col h-screen max-h-screen font-sans bg-black text-slate-200">
          <div className="flex flex-1 h-[calc(100%-88px)]">
            <Navigation />
            <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-gray-700 scrollbar">
              <Header />
              <Component {...pageProps} />
            </div>
          </div>

          <footer className="p-4">
            <div className="flex items-center justify-between h-14">
              <p>Footer</p>
            </div>
          </footer>
        </div>
      </QueryClientProvider>
    </SessionProvider>
  );
}
