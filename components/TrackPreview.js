import css from 'next/css';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
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
  track: gql`
    fragment TrackPreview on Track {
      id
      title
    }
  `,
};

TrackPreview.propTypes = {
  track: propType(TrackPreview.fragments.track).isRequired,
};

export default TrackPreview;
