import { PropTypes } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HtmlHead from '../components/HtmlHead';
import withData from './withData';

// color palette: http://paletton.com/#uid=33m0y0ksMDf8jVahZJZEepkKleL

const page = (WrappedComponent) => {
  const Page = props => (
    <div className="wrapper">
      <style jsx>{`
      .wrapper {
        font-family: Raleway, "Helvetica Neue", Helvetica, Arial, sans-serif;
        max-width: 960px;
        margin: 0 auto;
        display: flex;
        min-height: 100%;
        padding: 0 16px;
        flex-direction: column;
      }
    `}</style>
      <style jsx global>{`
      a {
        color: #02697C;
        text-decoration: none;
      }

      body {
        margin: 0;
      }

      .auth0-lock-header {
        display: none;
      }
    `}</style>
      <HtmlHead />
      <Header pathname={props.url.pathname} />
      <WrappedComponent {...props} />
      <Footer />
    </div>
  );

  Page.propTypes = {
    url: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  return Page;
};

export default WrappedComponent => withData(page(WrappedComponent));
