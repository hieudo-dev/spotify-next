import { AppProps } from "next/app";
import "styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-red-50 p-2">Header</header>

      <div className="flex-1 flex flex-col sm:flex-row">
        <main className="flex-1 bg-indigo-100 p-2">
          <Component {...pageProps} />;
        </main>
        <nav className="order-first sm:w-32 bg-purple-200 p-2">Navigation</nav>
        <aside className="sm:w-32 bg-yellow-100 p-2">Right Sidebar</aside>
      </div>

      <footer className="bg-gray-100 p-2">Footer</footer>
    </div>
  );
}
