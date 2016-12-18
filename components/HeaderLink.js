import { PropTypes } from 'react';
import NavLink from './NavLink';

const highlightStyle = {
  color: '#FFFBF5',
  backgroundColor: '#FF9933',
  paddingBottom: '1.2em',
};
export const baseStyle = {
  margin: '0 0.4em',
  padding: '0.4em 0.8em',
  display: 'inline-flex',
  textAlign: 'right',
  fontSize: '1.2em',
  letterSpacing: '1px',
  textDecoration: 'none',
  color: '#FF9933',
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
  pathname: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default HeaderLink;
