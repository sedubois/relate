import { PropTypes } from 'react';
import { gql } from 'react-apollo';
import graphql from '../util/graphql';

function Retreat({ data: { Retreat: { title } } }) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

Retreat.propTypes = {
  data: PropTypes.shape({
    Retreat: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const query = gql`
  query RetreatQuery($id: ID!) {
    Retreat(id: $id) {
      title
    }
  }
`;

export default graphql(query, {
  options({ url: { query: { id } } }) {
    return {
      variables: { id },
    };
  },
})(Retreat);
