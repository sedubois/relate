// TODO check query url.query as well
export default function isActive(url, href) {
  if (url && href) {
    return url.pathname === href;
  }
  return false;
}
