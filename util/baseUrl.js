export default process.browser
  ? window.location.origin ||
    `${window.location.protocol}//${window.location.hostname}${window.location.port
      ? `:${window.location.port}`
      : ''}`
  : undefined;
