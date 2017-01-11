import { PropTypes } from 'react';
import HeaderLink from './HeaderLink';
import ViewerHeader from './ViewerHeader';

const Header = ({ url }) => (
  <header>
    <style jsx>{`
      header {
        display: inline-flex;
        margin: 0 0 2em;
        padding: 0.7em;
      }
    `}</style>
    <HeaderLink url={url} href="/">Relate</HeaderLink>
    <HeaderLink url={url} href="/discover">Discover</HeaderLink>
    <HeaderLink url={url} href="/about">About</HeaderLink>
    {url !== '/auth/login' && <ViewerHeader />}
  </header>
);

Header.propTypes = {
  url: PropTypes.object.isRequired,
};

export default Header;
