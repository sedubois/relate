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
    <HeaderElem url={url} href="/" intlKey="Header.appName" />
    <HeaderElem url={url} href="/discover" intlKey="Header.about" />
    <HeaderElem url={url} href="/about" intlKey="Header.discover" />
    {showAuth(url) && <ViewerHeader url={url} />}
    {showAuth(url) && (loggedIn
        ? <HeaderElem url={url} href="/auth/logout" intlKey="Header.logout" />
        : <HeaderElem url={url} href="/auth/login" intlKey="Header.login" />)}
  </header>
);

Header.propTypes = {
  url: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default Header;
