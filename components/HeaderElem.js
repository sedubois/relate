import { PropTypes } from 'react';
import Link from 'next/prefetch';
import isActive from '../util/link';

const Div = ({ children }) => <div>{children}</div>;
Div.propTypes = {
  children: PropTypes.node,
};

const HeaderElem = ({ url, href, children }) => {
  const Wrapper = href ? Link : Div;
  return (
    <Wrapper href={href}>
      <div className={`headerElem ${isActive(url, href) && 'active'}`}>
        <style jsx>{`
      .headerElem {
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

      .headerElem.active,
      .headerElem:hover {
        color: #FFFBF5;
        background-color: #FF9933;
        padding-bottom: 1.2em;
      }
      `}</style>
        {children}
      </div>
    </Wrapper>
  );
};

HeaderElem.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  url: PropTypes.object,
};

export default HeaderElem;
