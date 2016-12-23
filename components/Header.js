import { PropTypes } from 'react';
import HeaderLink from './HeaderLink';
import ViewerHeader from './ViewerHeader';

const Header = ({ pathname }) => (
  <header>
    <style jsx>{`
      header {
        margin: 0 0 2em;
        minHeight: 3.5em;
        padding: 0.7em;
      }
    `}</style>
    <HeaderLink pathname={pathname} href="/">Relate</HeaderLink>
    <HeaderLink pathname={pathname} href="/discover">Discover</HeaderLink>
    <HeaderLink pathname={pathname} href="/about">About</HeaderLink>
    {pathname !== '/auth/login' && <ViewerHeader />}
  </header>
);

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Header;
