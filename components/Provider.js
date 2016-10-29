import React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from '../lib/apollo';

const Provider = ({ children }) => (
  <ApolloProvider client={client}>
    <div>
      {children}
    </div>
  </ApolloProvider>
);
Provider.propTypes = {
  children: React.PropTypes.arrayOf(
    React.PropTypes.node
  ).isRequired,
};

export default Provider;
