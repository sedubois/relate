import { PropTypes } from 'react';
import css from 'next/css';
import gql from 'graphql-tag';
import apollo from '../hocs/apollo';
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
  data: PropTypes.shape({
    // TODO get finer proptypes from fragments
    // https://github.com/apollostack/react-apollo/issues/302
    User: PropTypes.object,
  }).isRequired,
};

const query = gql`
  query Profile($slug: String!) {
    User(slug: $slug) {
      ...UserPreview
      tracks {
        ...TrackList
      }
    }
  }
`;

const withData = apollo(query, {
  options({ slug }) {
    return {
      fragments: [
        ...UserPreview.fragments.user.fragments(),
        ...TrackList.fragments.track.fragments(),
      ],
      variables: { slug },
    };
  },
});

export default withData(Profile);
