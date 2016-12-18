import { PropTypes } from 'react';
import css from 'next/css';
import HeaderLink from './HeaderLink';
import ViewerHeader from './ViewerHeader';

const Header = ({ pathname }) => (
  <div
    className={css({
      margin: '0 0 2em',
      minHeight: '3.5em',
      padding: '0.7em',
    })}
  >
    <HeaderLink pathname={pathname} href="/">Relate</HeaderLink>
    <HeaderLink pathname={pathname} href="/discover">Discover</HeaderLink>
    <HeaderLink pathname={pathname} href="/about">About</HeaderLink>
    {pathname !== '/auth/login' && <ViewerHeader />}
  </div>
);

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Header;
