import React from 'react';
import Users from '../containers/Users';
import Page from '../components/Page';

const Discover = props => (
  <Page pathname={props.url.pathname}>
    <Users />
  </Page>
);

Discover.propTypes = {
  url: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default Discover;
