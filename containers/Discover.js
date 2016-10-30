import React from 'react';
import gql from 'graphql-tag';
import apollo from './Apollo';

const Discover = props => (
  <div>
    {props.data.allUsers.map(u => <div key={u.id}>{u.givenName}</div>)}
  </div>
);
Discover.propTypes = {
  data: React.PropTypes.shape({
    allUsers: React.PropTypes.array,
  }).isRequired,
};

const MyQuery = gql`{
  allUsers {
    id
    givenName
  }
}`;

export default apollo(MyQuery)(Discover);
