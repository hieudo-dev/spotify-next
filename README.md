# spotify-next

Spotify-next is a clone of the Spotify web app, powered by Spotify Web API. It's built with Next.js, Next-Auth, Tailwind CSS, and React Query.

**Note**: Spotify's latest policy does not allow unlimited usage of their API, so you won't be able to try out the deploy version unless I whitelist your account. A quota extension request has been raised to get rid of this issue but it might take some time. For now the only option is to create a new Spotify app through their dashboard and use the credentials to run this project locally, more detailed intstructions below.

## Try it yourself
Clone the repository
```sh
$ git clone https://github.com/hieudo-dev/spotify-next.git
```

Navigate into spotify-next and install the necessary packages (Make sure you have _yarn_)
```sh
$ yarn install
```

Create a new .env file in the root folder with your app's keys
```sh
NEXT_PUBLIC_SPOTIFY_BASE_API=https://api.spotify.com/v1
CLIENT_ID = [client id optained from the Spotify Developer Dashboard]
NEXTAUTH_SECRET = [client secret optained from the Spotify Developer Dashboard]
NEXTAUTH_URL=http://localhost:3000
```

Create a new app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

![image](https://github.com/hieudo-dev/spotify-next/assets/37623000/36c101ac-e4c6-4a83-adca-b411ea26662d)

Open the created app's settings and whitelist localhost redirect uri

![image](https://github.com/hieudo-dev/spotify-next/assets/37623000/cb416a8c-3e86-4334-a42c-cdf0f88300d4)

Start up the app
```sh
$ yarn dev
```

## To-do

- [x] Play/Pause
- [x] Integrate React Query with SSR
- [x] Home page
- [x] Now Playing bar
- [x] Artist page
- [x] Playlist page
- [x] Album page
- [x] Liked Songs page

## Nice-to-haves
- [ ] Search page
- [ ] "More from top artists" section
- [ ] _Show more_ support
- [ ] Back/Forward status detection
- [ ] Support create playlist

**DISCLAIMER**: This project is for _educational purposes_ only, not for profit or commercial purposes.
