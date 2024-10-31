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
  - upload single & multiple files for same field
  - convert large video file in chunks
  - convert file as base64 and upload in parts
- Fetching and rendering dynamic data in [Mui Datagrid](https://mui.com/x/react-data-grid/).
  - Supporting sorting, filtering and pagination
  - Complete funxctionality for CRUD operations for list of people