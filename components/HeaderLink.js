import React from 'react';
import Link from 'next/link';
import css from 'next/css';

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

const HeaderLink = ({ pathname, href, children }) => {
  const style = {};
  Object.assign(style, baseStyle);
  if (pathname === href) {
    Object.assign(style, highlightStyle);
  }
  return (
    <Link href={href}>
      <a
        className={css(style)}
      >
        {children}
      </a>
    </Link>
  );
};
HeaderLink.propTypes = {
  pathname: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
  href: React.PropTypes.string.isRequired,
};

export default HeaderLink;
