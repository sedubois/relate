import { PropTypes } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import HeaderLink from './HeaderLink';

/**
 * @return null if no user or the view to render
 */
function ViewerHeader({ data: { user } }) {
  if (!user) {
    return null;
  }
  return (
    <HeaderLink href={user.slug}>{user.givenName}</HeaderLink>
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

// const Loading = () => <HeaderLink>...</HeaderLink>;

const withData = graphql(query); // TODO , undefined, { Loading });

export default withData(ViewerHeader);
