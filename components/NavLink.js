import { PropTypes } from 'react';
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
  className: PropTypes.object.isRequired,
  activeClassName: PropTypes.object,
  pathname: PropTypes.string,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavLink;
