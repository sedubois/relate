import React from 'react';
import css from 'next/css';
import gql from 'graphql-tag';
import apollo from './Apollo';
import NotFound from '../components/NotFound';
import TrackList from '../components/TrackList';
import UserPreview from '../components/UserPreview';

const userPreviewStyle = {
  wrapper: {
    display: 'inline-flex',
    marginBottom: '1em',
    fontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  p: {
    margin: 'auto 1em',
    fontSize: 'larger',
    fontWeight: 'bold',
    textAlign: 'right',
    borderBottom: '1px solid #FFC500',
    width: 'inherit',
  },
};

function Profile({ data: { User } }) {
  if (!User) {
    return <NotFound />;
  }
  return (
    <div
      className={css({
        margin: '0 1em',
      })}
    >
      {/* TODO find cleaner way to pass the style */}
      <UserPreview
        style={userPreviewStyle}
        user={UserPreview.fragments.user.filter(User)}
        link={false}
      />
      <TrackList tracks={User.tracks} />
    </div>
  );
}

Profile.propTypes = {
  data: React.PropTypes.shape({
    // TODO get finer proptypes from fragments
    // https://github.com/apollostack/react-apollo/issues/302
    User: React.PropTypes.object,
  }).isRequired,
};

// TODO get slug from URL parameters
const query = gql`{
  User(slug: "clang") {
    ...UserPreview
    tracks {
      ...TrackList
    }
  }
}`;

const withData = apollo(query, {
  options: {
    fragments: [
      ...UserPreview.fragments.user.fragments(),
      ...TrackList.fragments.track.fragments(),
    ],
  },
});

export default withData(Profile);
