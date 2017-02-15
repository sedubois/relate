const { hostname, origin, port, protocol } = window.location;

export default process.browser ? origin || `${protocol}//${hostname}${port ? `:${port}` : ''}` : undefined;
