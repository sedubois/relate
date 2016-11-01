import React from 'react';
import Page from '../components/Page';

const Index = props => (
  <Page pathname={props.url.pathname}>
      Welcome!
  </Page>
);

Index.propTypes = {
  url: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default Index;
