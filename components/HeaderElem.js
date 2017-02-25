import { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import isActive from '../util/link';

function createWrapper(href, as) {
  const Wrapper = ({ children }) => (href
    ? <Link prefetch href={href} as={as}>{children}</Link>
    : <div>{children}</div>);
  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return Wrapper;
}

const HeaderElem = ({ url, href, as, intlKey, children }) => {
  const Wrapper = createWrapper(href, as);
  return (
    <Wrapper>
      <a className={`headerElem ${isActive(url, href) && 'active'}`}>
        {intlKey && <FormattedMessage id={intlKey} />}
        {children && children}
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
          }
        `}</style>
      </a>
    </Wrapper>
  );
};

HeaderElem.propTypes = {
  children: PropTypes.node, // eslint-disable-line react/require-default-props
  intlKey: PropTypes.string, // eslint-disable-line react/require-default-props
  href: PropTypes.string, // eslint-disable-line react/require-default-props
  as: PropTypes.string, // eslint-disable-line react/require-default-props
  url: PropTypes.object, // eslint-disable-line react/require-default-props
};

export default HeaderElem;
