# express-server

Express JS Application with Typescript

## Running the app

```bash
# development
$ yarn run dev

# production mode
$ yarn run start:prod
```

# npm packages used

- [fluent-ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg) - 2.1.3

### PoC

- Files uploading using multer
  - create dynamic folder & filter file(s)
  - upload single & multiple files for same field
  - upload file(s) in different fields
  - upload videos as chunk and combine
  - upload video as base64 files and combine
  - combine video using ***fluent-ffmpeg***
  - reading from and writing to a file
  - delete file and folder
- People API
  - CRUD operations
  - Advanced filtering using operators from [Mui Datagrid](https://mui.com/x/react-data-grid/)