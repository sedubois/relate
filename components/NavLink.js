import React from 'react';
import Link from 'next/link';
import { style, merge } from 'glamor';

const NavLink = ({ className, activeClassName, pathname, href, children }) => (
  <Link href={href}>
    <a className={pathname === href ? merge(className, activeClassName) : style(className)}>
      {children}
    </a>
  </Link>
);
NavLink.propTypes = {
  className: React.PropTypes.object.isRequired,
  activeClassName: React.PropTypes.object,
  pathname: React.PropTypes.string,
  href: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};

export default NavLink;
