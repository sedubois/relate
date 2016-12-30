import { PropTypes } from 'react';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import UserBadge from './UserBadge';

function UserHeader({ user }) {
  return (
    <div
      className="wrapper"
      href={`/profile?slug=${user.slug}`}
    >
      <style jsx>{`
        .wrapper {
          display: inline-flex;
          margin-bottom: 1em;
          font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        .userName {
          margin: auto 1em;
          font-size: larger;
          font-weight: bold;
          text-align: right;
          border-bottom: 1px solid #FFC500;
          width: inherit;
        }
      `}</style>
      <UserBadge user={user} />
      <p className="userName">
        {`${user.givenName} ${user.familyName}`}
      </p>
    </div>
  );
}

// TODO deduplicate with UserPreview.js
UserHeader.fragments = {
  user: gql`    
    fragment UserHeader on User {
      slug
      givenName
      familyName
      ...UserBadge
    }
    ${UserBadge.fragments.user}
  `,
};

UserHeader.propTypes = {
  style: PropTypes.shape({
    wrapper: PropTypes.object.isRequired,
    p: PropTypes.object.isRequired,
  }),
  user: propType(UserHeader.fragments.user).isRequired,
  link: PropTypes.bool,
};

export default UserHeader;
