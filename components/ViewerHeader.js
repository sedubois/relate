import { PropTypes } from 'react';
import css from 'next/css';
import gql from 'graphql-tag';
import apollo from '../hocs/apollo';
import { baseStyle } from './HeaderLink';

/**
 * @return null if no user or the view to render
 */
function ViewerHeader({ data: { user } }) {
  if (!user) {
    return null;
  }
  return (
    <div style={{ right: 0 }} className={css(baseStyle)}>
      {user.givenName}
    </div>
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

const Loading = () => <div className={css(baseStyle)}>...</div>;

const withData = apollo(query, undefined, { Loading });

export default withData(ViewerHeader);
