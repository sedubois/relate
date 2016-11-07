import React from 'react';
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
  data: React.PropTypes.shape({
    Track: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
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
