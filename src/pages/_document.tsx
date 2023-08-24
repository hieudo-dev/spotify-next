import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
        <script>
          {/* Place a noop callback to avoid errors when the SDK is loaded eagerly */}
          {"window.onSpotifyWebPlaybackSDKReady = function() {}"}
        </script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
