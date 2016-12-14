import { PropTypes } from 'react';
import gql from 'graphql-tag';
import ReactPlayer from 'react-player';
import apollo from '../hocs/apollo';

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

const withData = apollo(query, {
  options({ id }) {
    return {
      variables: { id },
    };
  },
});

export default withData(TrackPlayer);
