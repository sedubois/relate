import { filter, propType } from 'graphql-anywhere';
import { gql } from 'react-apollo';
import ErrorPage from 'next/error';
import graphql from '../util/graphql';
import RetreatList from '../components/RetreatList';
import TrackList from '../components/TrackList';
import UserHeader from '../components/UserHeader';

function Profile({ data: { User } }) {
  if (!User) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div className="profile">
      <style jsx>{`
        .profile {
          margin: 0 1em;
        }
      `}</style>
      <UserHeader user={filter(UserHeader.fragments.user, User)} />
      {User.facilitatedRetreats.length > 0 &&
        <RetreatList facilitatedRetreats={User.facilitatedRetreats} />}
      {User.tracks.length > 0 && <TrackList tracks={User.tracks} />}
    </div>
  );
}

const query = gql`
  query Profile($slug: String!) {
    User(slug: $slug) {
      ...UserHeader
      ...Retreats
      ...Tracks
    }
  }
  ${UserHeader.fragments.user}
  ${RetreatList.fragments.facilitatedRetreats}
  ${TrackList.fragments.tracks}
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
