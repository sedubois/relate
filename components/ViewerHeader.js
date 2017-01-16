import { PropTypes } from 'react';
import gql from 'graphql-tag';
import graphql from '../util/graphql';
import HeaderElem from './HeaderElem';

/**
 * @return null if no user or the view to render
 */
function ViewerHeader({ data: { user } }) {
  if (!user) {
    return null;
  }
  return (
    <HeaderElem href={user.slug}>{user.givenName}</HeaderElem>
  );
}

ViewerHeader.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.shape({
      givenName: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const query = gql`{
  user {
    givenName
  }
}`;

const Loading = () => <HeaderElem>...</HeaderElem>;

export default graphql(query, { Loading })(ViewerHeader);
