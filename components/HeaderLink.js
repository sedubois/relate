import React from 'react';
import NavLink from './NavLink';

const highlightStyle = {
  color: '#FFFBF5',
  backgroundColor: '#FFC165',
  paddingBottom: '1.2em',
};
const baseStyle = {
  margin: '0 0.4em',
  padding: '0.4em 0.8em',
  display: 'inline-flex',
  textAlign: 'right',
  fontSize: '1.2em',
  letterSpacing: '1px',
  textDecoration: 'none',
  color: '#FF5600',
  borderRadius: '5px 25px',
  backgroundColor: '#FFFBF5',
  transition: 'all 0.1s linear',
  ':hover': highlightStyle,
};

const HeaderLink = ({ pathname, href, children }) => (
  <NavLink
    className={baseStyle}
    activeClassName={highlightStyle}
    pathname={pathname}
    href={href}
  >
    {children}
  </NavLink>
);
HeaderLink.propTypes = {
  pathname: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
  href: React.PropTypes.string.isRequired,
};

export default HeaderLink;
