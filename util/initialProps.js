export default function getInitialProps(Component, ctx) {
  if (Component.getInitialProps) {
    return Component.getInitialProps(ctx);
  }
  return {};
}
