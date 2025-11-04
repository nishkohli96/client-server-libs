# @csl/shared-fe

Local npm package that is being used in `frontend` app. Make sure to build this before running its dependents. 

You can also create similar packages, say for sharing UI components between multiple frontend apps or sharing types between client and server application.

## Components

- Error Boundary

## Hooks

- `useInternetCheck` - Detect internet connection (ping google)
- `useLocation` - Get location coordinates
- `useOnlineStatus` - Detect internet connection (navigator.onLine)

## Utils

- Get Browser Details using [ua-parser-js](https://docs.uaparser.dev/)
