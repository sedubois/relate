import { PropTypes } from 'react';
import HeaderElem from './HeaderElem';
import ViewerHeader from './ViewerHeader';

function showAuth(url) {
  return !url.pathname.startsWith('/auth');
}

const Header = ({ url, loggedIn }) => (
  <header>
    <style jsx>{`
      header {
        display: inline-flex;
        margin: 0 0 2em;
        padding: 0.7em;
        min-height: 3.3em;
      }
    `}</style>
    <HeaderElem url={url} href="/">Relate</HeaderElem>
    <HeaderElem url={url} href="/discover">Discover</HeaderElem>
    <HeaderElem url={url} href="/about">About</HeaderElem>
    {showAuth(url) && <ViewerHeader url={url} />}
    {showAuth(url) && (loggedIn
        ? <HeaderElem url={url} href="/auth/logout">Logout</HeaderElem>
        : <HeaderElem url={url} href="/auth/login">Login</HeaderElem>)}
  </header>
);

Header.propTypes = {
  url: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default Header;
