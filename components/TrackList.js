import { PropTypes } from 'react';
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
  tracks: gql`
    fragment Tracks on Member {
      tracks {
        id
        title
      }
    }
  `,
};

TrackList.propTypes = {
  // TODO figure out why this yields an error
  // tracks: propType(TrackList.fragments.tracks).isRequired,
  tracks: PropTypes.array.isRequired,
};

export default TrackList;
