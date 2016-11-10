import React from 'react';
import css from 'next/css';
import gql from 'graphql-tag';
import apollo from '../hocs/apollo';
import { baseStyle } from './HeaderLink';

const className = css.merge(baseStyle, { right: 0 });

/**
 * @return null if no user or the view to render
 */
function ViewerHeader({ data: { user } }) {
  if (!user) {
    return null;
  }
  return (
    <div className={className}>
      {user.givenName}
    </div>
  );
}

ViewerHeader.propTypes = {
  data: React.PropTypes.shape({
    user: React.PropTypes.shape({
      givenName: React.PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const query = gql`{
  user {
    givenName
  }
}`;

const Loading = () => <div className={className}>...</div>;

const withData = apollo(query, undefined, { Loading });

export default withData(ViewerHeader);
