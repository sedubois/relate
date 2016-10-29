import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import DataError from '../components/DataError';
import DataLoading from '../components/DataLoading';

const Discover = (props) => {
  if (props.data.error) {
    return <DataError />;
  }
  if (props.data.loading) {
    return <DataLoading />;
  }
  return (
    <div>
      {props.data.allUsers.map(u => <div key={u.id}>{u.givenName}</div>)}
    </div>
  );
};
Discover.propTypes = {
  data: React.PropTypes.shape({
    error: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
    allUsers: React.PropTypes.array,
  }).isRequired,
};

const MyQuery = gql`{
  allUsers {
    id
    givenName
  }
}`;

export default graphql(MyQuery)(Discover);
