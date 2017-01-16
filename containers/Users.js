import { filter } from 'graphql-anywhere';
import gql from 'graphql-tag';
import graphql from '../util/graphql';
import UserPreview from '../components/UserPreview';

const Users = ({ data: { allUsers } }) => ( // eslint-disable-line react/prop-types
  <div className="wrapper">
    <style jsx>{`
      .wrapper {
        display: flex;
        justify-content: center;
      }
    `}</style>
    {allUsers
      // TODO filter server-side when available: https://github.com/graphcool/feature-requests/issues/20
      .filter(u => u._tracksMeta.count > 0)
      .map(u => <UserPreview key={u.id} user={filter(UserPreview.fragments.user, u)} />)}
  </div>
);

const query = gql`
  query {
    allUsers {
      id
      ...UserPreview
      _tracksMeta {
        count
      }
    }
  }
  ${UserPreview.fragments.user}
`;

// This still yields Warning (can be ignored but annoying, so commenting out for now):
// "Failed prop type: The inline argument "slug" is expected as a variable but was not provided."
// https://github.com/apollostack/graphql-anywhere/issues/24
// Users.propTypes = {
//   data: propType(query).isRequired,
// };

export default graphql(query)(Users);
