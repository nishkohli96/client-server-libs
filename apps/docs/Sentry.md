# Sentry

1.  You can configure rate limit for a dsn for a particular project. Rate limit will allow only `n` number of events in a particular timeframe. Go to **Client Keys(DSN)** under SDK Setup in project settings. There you can create new keys with a specified rate limit for a particular environment.

2.  Similarly you can create custom dashboard under the **Dashboards** section to view unique metrics, either in a form of big number, bar charts, graphs or even tables. Refer [this video](https://www.youtube.com/watch?v=4qY6iaJ0ZEI&list=PLOwEowqdeNMr7wwxSeUChfvxkcvOD4PhW&index=13).

3.  GitHub Actions Release Workflow:

    ```
    cd apps/react-client
    npx sentry-cli releases new $GITHUB_SHA
    npx sentry-cli releases set-commits --auto $GITHUB_SHA
    npx sentry-cli releases finalize $GITHUB_SHA
    ```

	➡ Purpose:
  - Creates a new Sentry release (releases new $GITHUB_SHA).
  - Associates commits from your repo (set-commits --auto).
  - Finalizes the release (releases finalize $GITHUB_SHA).
  - Ensures errors are linked to a specific release version in Sentry.
	- Then run `sentry:sourcemaps` script to upload source maps to the correct release.