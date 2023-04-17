import { AppProps } from "next/app";
import "styles/globals.css";
import Navigation from "components/Navigation";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col h-screen max-h-screen font-sans bg-black text-slate-200">
      <div className="flex flex-1 h-[calc(100%-88px)]">
        <Navigation />
        <div className="w-full bg-slate-950">
          <header className="p-2">Header</header>
          <main className="flex-1 p-2">
            <Component {...pageProps} />
          </main>
        </div>
      </div>

      <footer className="p-4">
        <div className="flex items-center justify-between h-14">
          <p>Footer</p>
        </div>
      </footer>
    </div>
  );
}
