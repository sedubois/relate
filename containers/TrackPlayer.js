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

// TODO get track ID from URL
const query = gql`{
  Track(id: "citr9zth1051m0124u62fcrfz") {
    title
    url
  }
}`;

export default apollo(query)(TrackPlayer);
