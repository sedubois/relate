import React from 'react';
import Discover from '../containers/Discover';
import Page from '../components/Page';

const DiscoverPage = props => (
  <Page pathname={props.url.pathname}>
    <Discover />
  </Page>
);
DiscoverPage.propTypes = {
  url: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default DiscoverPage;
