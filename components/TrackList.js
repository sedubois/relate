import { PropTypes } from 'react';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import { FormattedMessage } from 'react-intl';
import ItemList from './ItemList';
import ItemPreview from './ItemPreview';

function TrackList({ tracks }) {
  return (
    <ItemList title={<FormattedMessage id="TrackList.title" />}>
      {tracks.map(track => (
        <ItemPreview key={track.id} href={`/track?id=${track.id}`} as={`/track/${track.id}`}>
          <p className="playButton">
            ▶
          </p>
          <p>{track.title}</p>
        </ItemPreview>
      ))}
    </ItemList>
  );
}

TrackList.fragments = {
  track: gql`
    fragment TrackList on Track {
      id
      title
    }
  `,
};

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(
    propType(TrackList.fragments.track).isRequired,
  ).isRequired,
};

export default TrackList;
