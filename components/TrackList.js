import { PropTypes } from 'react';
import { filter, propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import TrackPreview from './TrackPreview';

function TrackList({ tracks }) {
  return (
    <div className="trackList">
      <style jsx>{`
        .trackList {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
      {tracks.map(track =>
        <TrackPreview key={track.id} track={filter(TrackPreview.fragments.track, track)} />)}
    </div>
  );
}

TrackList.fragments = {
  track: gql`
    fragment TrackList on Track {
      id
      ...TrackPreview
    }
    ${TrackPreview.fragments.track}
  `,
};

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(
    propType(TrackList.fragments.track).isRequired,
  ).isRequired,
};

export default TrackList;
