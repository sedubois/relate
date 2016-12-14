import { PropTypes } from 'react';
import css from 'next/css';
import gql from 'graphql-tag';
import Fragment from 'graphql-fragments';
import NavLink from './NavLink';
import previewCardStyle from '../styles/PreviewCard';

function TrackPreview({ track }) {
  return (
    <NavLink
      href={`/track?id=${track.id}`}
      className={previewCardStyle.wrapper}
    >
      <p
        className={css({
          fontSize: '200%',
          margin: 0,
        })}
      >
        ▶
      </p>
      <p>{track.title}</p>
    </NavLink>
  );
}

TrackPreview.fragments = {
  track: new Fragment(gql`
    fragment TrackPreview on Track {
      id
      title
    }
  `),
};

// TODO use fragment proptypes
TrackPreview.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default TrackPreview;
