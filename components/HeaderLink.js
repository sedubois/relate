import { PropTypes } from 'react';
import Link from 'next/link';

const HeaderLink = ({ url, href, children }) => (
  <Link href={href}>
    <div className={`headerLink ${href && url.pathname === href && 'active'}`}>
      <style jsx>{`
      .headerLink {
        background-color: #FFFBF5;
        border-radius: 5px 25px;
        color: #FF9933;
        font-size: 1.2em;
        letter-spacing: 1px;
        margin: 0 0.4em;
        padding: 0.4em 0.8em;
        text-decoration: none;
        transition: all 0.1s linear;
      }

      .headerLink.active,
      .headerLink:hover {
        color: #FFFBF5;
        background-color: #FF9933;
        padding-bottom: 1.2em;
      }
      `}</style>
      {children}
    </div>
  </Link>
);
HeaderLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  url: PropTypes.object,
};

export default HeaderLink;
