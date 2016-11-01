import React from 'react';
import css from 'next/css';
import HtmlHead from './HtmlHead';
import Header from './Header';
import Footer from './Footer';

css.insertRule(`
  a {
    color: #A78100;
    text-decoration: none;
  }
  
  body {
    margin: 0;
  }
`);

const style = css({
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  maxWidth: 'calc(768px + 16px * 2)',
  margin: '0 auto',
  display: 'flex',
  minHeight: '100%',
  padding: '0 16px',
  flexDirection: 'column',
});

const Page = ({ pathname, children }) => (
  <div className={style}>
    <HtmlHead />
    <Header pathname={pathname} />
    {children}
    <Footer />
  </div>
);
Page.propTypes = {
  pathname: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};

export default Page;
