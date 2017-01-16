import { PropTypes } from 'react';
import gql from 'graphql-tag';
import ReactPlayer from 'react-player';
import graphql from '../util/graphql';

function TrackPlayer({ data: { Track: { title, url } } }) {
  return (
    <div>
      <h1>{title}</h1>
      <ReactPlayer
        style={{
          maxWidth: '400px',
          margin: '0 auto',
        }}
        url={url}
        controls
      />
    </div>
  );
}

TrackPlayer.propTypes = {
  data: PropTypes.shape({
    Track: PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const query = gql`
  query TrackQuery($id: ID!) {
    Track(id: $id) {
      title
      url
    }
  }
`;

export default graphql(query, {
  options({ url: { query: { id } } }) {
    return {
      variables: { id },
    };
  },
})(TrackPlayer);
