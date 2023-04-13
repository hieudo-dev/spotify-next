import { AppProps } from "next/app";
import "styles/globals.css";
import Navigation from "components/Navigation";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col text-slate-200 font-sans bg-black">
      <div className="flex-1 flex">
        <Navigation />
        <div className="w-full bg-slate-950 flex flex-col">
          <header className="p-2">Header</header>
          <main className="flex-1 p-2">
            <Component {...pageProps} />
          </main>
        </div>
      </div>

      <footer className="p-4">
        <div className="h-14 flex items-center justify-between">
          <p>Footer</p>
        </div>
      </footer>
    </div>
  );
}
