import { PropTypes } from 'react';
import css from 'next/css';
import gql from 'graphql-tag';
import apollo from '../hocs/apollo';
import UserPreview from '../components/UserPreview';

const Users = props => (
  <div
    className={css({
      display: 'flex',
      justifyContent: 'center',
    })}
  >
    {props.data.allUsers
      // TODO filter server-side when available: https://github.com/graphcool/feature-requests/issues/20
      .filter(u => u._tracksMeta.count > 0)
      .map(u => <UserPreview key={u.id} user={UserPreview.fragments.user.filter(u)} />)}
  </div>
);

Users.propTypes = {
  data: PropTypes.shape({
    allUsers: PropTypes.array,
  }).isRequired,
};

const query = gql`{
  allUsers {
    id
    ...UserPreview
    _tracksMeta {
      count
    }
  }
}`;

const withData = apollo(query, {
  options: {
    fragments: UserPreview.fragments.user.fragments(),
  },
});

export default withData(Users);
