import { filter, propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import apollo from '../hocs/apollo';
import UserPreview from '../components/UserPreview';

const Users = ({ data: { allUsers } }) => (
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

Users.propTypes = {
  data: propType(query).isRequired,
};

export default apollo(query)(Users);
