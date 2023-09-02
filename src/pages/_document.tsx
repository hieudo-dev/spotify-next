import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
        <link rel="icon" href="/images/favicon.png" sizes="32x32"></link>
        <title>Spotify next</title>
        <meta name="description" content="Spotify next" />
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
