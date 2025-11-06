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

Run the `setup.sh` script.

```bash
sh setup.sh
```

This will perform the following tasks:

- Install `node_modules` in workspace root
- Build the `@csl/mongo-models`, `@csl/react-express` and `@csl/shared-fe` packages.
- Link these packages to the respective applications in the `apps` directory. 

To apply any changes made in the shared packages, rebuild them by running the command below:

```bash
yarn lib
```

Build, run, lint or test all your apps in one command thanks to [Turborepo's Pipelines](https://turborepo.org/docs/core-concepts/pipelines)

Each of the applications have common scripts which can be easily executed in parallel by turborepo's pipelines. Add these in `turbo.json`.

| Command | Result |
|-|-|
|`dev`| Run development server |
|`build`| Build the application |
|`start`| Run the production build |
|`prod`| Build the app and then run the build |
|`lint`| Run eslint to fix code |

## Upgrade Dependencies

[npm-check-updates](https://www.npmjs.com/package/npm-check-updates) is an excellent tool for detecting the latest versions of dependencies and updating them in your `package.json`. It simplifies the process of keeping your project up to date with the latest package versions.

To update all **dependencies** and **devDependencies** across the workspace, run:

```bash
ncu -ws --format group -u
```

Followed by

```bash
turbo build
```

## Support Me

If you found these code snippets helpful and saved your valuable time, please consider [buying me a coffee](https://www.buymeacoffee.com/nish1896).
