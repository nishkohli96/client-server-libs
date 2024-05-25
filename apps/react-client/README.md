# react-client

## Running the app

Build the local npm package `@csl/shared-fe` first.
```
yarn workspace @csl/shared-fe lib:build
```

```bash
# development
$ yarn run dev

# production mode
$ yarn run start:prod
```

## Libraries & Frameworks used

- [axios](https://axios-http.com/)
- [dato-cms](https://www.datocms.com/)
- [mui](https://mui.com/)
- [react-helmet-async](https://www.npmjs.com/package/react-helmet-async)

## PoC

- File Upload on `express-server`
	- convert large video file in chunks
	- convert file as base64 and upload in parts