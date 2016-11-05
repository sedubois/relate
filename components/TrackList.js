import React from 'react';
import css from 'next/css';
import gql from 'graphql-tag';
import Fragment from 'graphql-fragments';
import TrackPreview from './TrackPreview';

function TrackList({ tracks }) {
  return (
    <div
      className={css({
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      })}
    >
      {tracks.map(track =>
        <TrackPreview key={track.id} track={TrackPreview.fragments.track.filter(track)} />)}
    </div>
  );
}

TrackList.fragments = {
  track: new Fragment(gql`
    fragment TrackList on Track {
      id
      ...TrackPreview
    }
  `, TrackPreview.fragments.track),
};

TrackList.propTypes = {
  tracks: React.PropTypes.arrayOf(
    TrackList.fragments.track.propType,
  ).isRequired,
};

export default TrackList;
