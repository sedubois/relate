import { filter, propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import graphql from '../util/graphql';
import NotFound from '../components/NotFound';
import RetreatList from '../components/RetreatList';
import TrackList from '../components/TrackList';
import UserHeader from '../components/UserHeader';

function Profile({ data: { Member } }) {
  if (!Member) {
    return <NotFound />;
  }
  return (
    <div className="profile">
      <style jsx>{`
        .profile {
          margin: 0 1em;
        }
      `}</style>
      <UserHeader user={filter(UserHeader.fragments.user, Member)} />
      {Member.retreats.length > 0 && <RetreatList retreats={Member.retreats} />}
      {Member.tracks.length > 0 && <TrackList tracks={Member.tracks} />}
    </div>
  );
}

const query = gql`
  query Profile($slug: String!) {
    Member(slug: $slug) {
      ...UserHeader
      retreats {
        ...RetreatList
      }
      tracks {
        ...TrackList
      }
    }
  }
  ${UserHeader.fragments.user}
  ${RetreatList.fragments.retreat}
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
