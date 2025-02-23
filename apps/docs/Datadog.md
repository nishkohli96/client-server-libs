# Datadog

## Node.js Integration

- [Documentation](https://datadoghq.dev/dd-trace-js/index.html) for [dd-trace](https://www.npmjs.com/package/dd-trace)
- [Configuration Options](https://docs.datadoghq.com/tracing/trace_collection/library_config/nodejs/)
- Logging with [winston](https://docs.datadoghq.com/logs/log_collection/nodejs/?tab=winston30).

## Browser

- [Logs](https://docs.datadoghq.com/logs/log_collection/javascript/)
- [Bundling with Next.js](https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling-with-nextjs)

## Notes

1.  On a host, the Agent is configured using a [YAML file](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml), whereas Agent configuration options for a container’s Agent are passed in with environment variables, for example:
    - `DD_API_KEY` for the Datadog API key
    - `DD_SITE for` the Datadog site

	Read more about it [here](https://docs.datadoghq.com/getting_started/agent/.)
2. After installating the agent on your local machine, you can run the agent using `datadog-agent run`. To see the list of available commands, run the `datadog-agent` command in your terminal.
