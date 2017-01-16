import { PropTypes } from 'react';
import HeaderElem from './HeaderElem';
import ViewerHeader from './ViewerHeader';

const Header = ({ url }) => (
  <header>
    <style jsx>{`
      header {
        display: inline-flex;
        margin: 0 0 2em;
        padding: 0.7em;
      }
    `}</style>
    <HeaderElem url={url} href="/">Relate</HeaderElem>
    <HeaderElem url={url} href="/discover">Discover</HeaderElem>
    <HeaderElem url={url} href="/about">About</HeaderElem>
    {url.pathname !== '/auth/login' && <ViewerHeader url={url} />}
  </header>
);

Header.propTypes = {
  url: PropTypes.object.isRequired,
};

export default Header;
