import css from 'next/css';
import { filter, propType } from 'graphql-anywhere';
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
        user={filter(UserPreview.fragments.user, User)}
        link={false}
      />
      <TrackList tracks={User.tracks} />
    </div>
  );
}

const query = gql`
  query Profile($slug: String!) {
    User(slug: $slug) {
      ...UserPreview
      tracks {
        ...TrackList
      }
    }
  }
  ${UserPreview.fragments.user}
  ${TrackList.fragments.track}
`;

Profile.propTypes = {
  data: propType(query).isRequired,
};

const withData = apollo(query, {
  options({ slug }) {
    return {
      variables: { slug },
    };
  },
});

export default withData(Profile);
