import { filter, propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import graphql from '../util/graphql';
import UserPreview from '../components/UserPreview';

const Users = ({ data: { allMembers } }) => (
  <div className="wrapper">
    <style jsx>{`
      .wrapper {
        display: flex;
        justify-content: center;
      }
    `}</style>
    {allMembers
      .map(u => <UserPreview key={u.id} user={filter(UserPreview.fragments.user, u)} />)}
  </div>
);

const query = gql`
  query {
    allMembers(
      filter: {
        OR: [{
          tracks_some: {
            id_not: "nonExistentId"
          }
        }, {
          retreats_some: {
            id_not: "nonExistentId"
          }
        }]
      }
    ) {
      id
      ...UserPreview
    }
  }
  ${UserPreview.fragments.user}
`;

Users.propTypes = {
  data: propType(query).isRequired,
};

export default graphql(query)(Users);
