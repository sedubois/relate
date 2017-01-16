import { filter } from 'graphql-anywhere';
import gql from 'graphql-tag';
import graphql from '../util/graphql';
import NotFound from '../components/NotFound';
import TrackList from '../components/TrackList';
import UserHeader from '../components/UserHeader';

function Profile({ data: { User } }) { // eslint-disable-line react/prop-types
  if (!User) {
    return <NotFound />;
  }
  return (
    <div className="profile">
      <style jsx>{`
        .profile {
          margin: 0 1em;
        }
      `}</style>
      <UserHeader user={filter(UserHeader.fragments.user, User)} />
      <TrackList tracks={User.tracks} />
    </div>
  );
}

const query = gql`
  query Profile($slug: String!) {
    User(slug: $slug) {
      ...UserHeader
      tracks {
        ...TrackList
      }
    }
  }
  ${UserHeader.fragments.user}
  ${TrackList.fragments.track}
`;

// This still yields Warning (can be ignored but annoying, so commenting out for now):
// "Failed prop type: The inline argument "slug" is expected as a variable but was not provided."
// https://github.com/apollostack/graphql-anywhere/issues/24
// Profile.propTypes = {
//   data: propType(query).isRequired,
// };

export default graphql(query, {
  options({ url: { query: { slug } } }) {
    return {
      variables: { slug },
    };
  },
})(Profile);
