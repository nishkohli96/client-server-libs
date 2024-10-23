# client-server-libs

**Experimenting with different technologies that require client-server interaction**

## Features

- [Turborepo](https://turborepo.org/)
- [React](https://reactjs.org/) v18, [NestJs](https://nestjs.com/) v14.1, [ExpressJS](https://expressjs.com/), [NestJS](https://nestjs.com/) v10.3
- 100% [Typescript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/) and Eslint setup alongside `pre-commit` hook.
- [Dockerize](https://docs.docker.com/) images
- Github Actions to test apps & docker images build

## Get Started

The code for shared packages are in the `packages` folder & the applications code in the `apps` folder.

Install `node_modules`

```
yarn
```

Build, run, lint or test all your apps in one command thanks to [Turborepo's Pipelines](https://turborepo.org/docs/core-concepts/pipelines)

To Build the shared packages,

```
turbo lib:build
```

Each of the applications have common scripts which can be easily executed in parallel by turborepo's pipelines. Add these in `turbo.json`.

| Command | Result |
|-|-|
|`dev`| Run development server |
|`build`| Build the application |
|`start`| Run the production build |
|`prod`| Build the app and then run the build |
|`lint`| Run eslint to fix code |

## Support Me

If you found this template helpful and saved your valuable time, consider [buying me a coffee](https://www.buymeacoffee.com/nish1896)
