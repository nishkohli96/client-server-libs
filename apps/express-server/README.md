# express-server

Express JS Application with Typescript

## Running the app

```bash
# development
$ yarn run dev

# production mode
$ yarn run start:prod
```

### PoC

- Files uploading using multer
  - create dynamic folder & filter file(s)
  - upload single & multiple files for same field
  - upload file(s) in different fields
  - upload videos as chunk and combine
  - upload video as base64 files and combine
  - combine video using [fluent-ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg)
  - reading from and writing to a file
  - delete file and folder
- People API
  - CRUD operations
  - Advanced filtering using operators from [Mui Datagrid](https://mui.com/x/react-data-grid/)
- [Stytch](https://stytch.com/) authentication methods
- Connect to **Postgres** and **MySQL** DBs deployed on [railway](https://docs.railway.com/) using [Sequelize](https://sequelize.org/)
- [Redis](https://redis.io/) connection using [redis](https://www.npmjs.com/package/redis) and [ioredis](https://www.npmjs.com/package/ioredis) packages. Prepared doc containing some commonly used [redis commands](https://redis.io/docs/latest/commands/)
- How to design a permission based system ? Watch this [Youtube Video](https://www.youtube.com/watch?v=5GG-VUvruzE) with [source code](https://github.com/WebDevSimplified/permission-system/tree/main). You can also use a user-management system like [Clerk](https://clerk.com/)
- Track user analytics using [Mixpanel](https://mixpanel.com/home/).
- AWS Services
  - IAM using [@aws-sdk/client-iam](https://www.npmjs.com/package/@aws-sdk/client-iam)
  - Redis Elasticache using [ioredis](https://www.npmjs.com/package/ioredis)
  - SES using[@aws-sdk/client-ses](https://www.npmjs.com/package/@aws-sdk/client-ses)
  - S3 using [@aws-sdk/client-s3](https://www.npmjs.com/package/@aws-sdk/client-s3) alongside creating csv file using [papaparse](https://www.npmjs.com/package/papaparse) and downloading files
  - SQS using[@aws-sdk/client-sqs](https://www.npmjs.com/package/@aws-sdk/client-sqs)
  - SNS using[@aws-sdk/client-sns](https://www.npmjs.com/package/@aws-sdk/client-sns)
  - Access environment variables stored in **Parameter Store** using
  [@aws-sdk/client-ssm](https://www.npmjs.com/package/@aws-sdk/client-ssm)
  - Create, get secrets using [@aws-sdk/client-secrets-manager](https://www.npmjs.com/package/@aws-sdk/client-secrets-manager)
  - Dynamo DB using [@aws-sdk/client-dynamodb](https://www.npmjs.com/package/@aws-sdk/client-dynamodb)
  - Lambda using [@aws-sdk/client-lambda](https://www.npmjs.com/package/@aws-sdk/client-lambda)