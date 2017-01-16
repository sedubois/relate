import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import Link from 'next/link';

function TrackPreview({ track }) {
  return (
    <Link href={`/track?id=${track.id}`} as={`/track/${track.id}`}>
      <div className="wrapper">
        <style jsx>{`
          .wrapper {
            width: 13em;
            margin: 0.5em;
            padding-top: 1.5em;
            border-radius: 5px;
            box-shadow: 0 1px 3px #A78100;
            text-align: center;
          }

          p {
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 90%;
          }

          .playButton {
            font-size: 200%;
            margin: 10px;
          }
        `}</style>
        <p className="playButton">
          ▶
        </p>
        <p>{track.title}</p>
      </div>
    </Link>
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
