import { filter, propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import graphql from '../util/graphql';
import NotFound from '../components/NotFound';
import TrackList from '../components/TrackList';
import UserHeader from '../components/UserHeader';

function Profile({ data: { User } }) {
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

Profile.propTypes = {
  data: propType(query).isRequired,
};

export default graphql(query, {
  options({ url: { query: { slug } } }) {
    return {
      variables: { slug },
    };
  },
})(Profile);
