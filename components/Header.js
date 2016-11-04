import React from 'react';
import css from 'next/css';
import HeaderLink from './HeaderLink';

const Header = ({ pathname }) => (
  <div
    className={css({
      margin: '1em 0',
      padding: '0.7em',
      minHeight: '5.1em',
      borderRadius: '5px',
      backgroundImage: 'url(static/banner.png)',
      backgroundSize: 'cover',
    })}
  >
    <HeaderLink pathname={pathname} href="/">Home</HeaderLink>
    <HeaderLink pathname={pathname} href="/discover">Discover</HeaderLink>
    <HeaderLink pathname={pathname} href="/about">About</HeaderLink>
  </div>
);

Header.propTypes = {
  pathname: React.PropTypes.string.isRequired,
};

export default Header;
