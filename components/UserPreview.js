import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import { Link } from '../universal/routes';
import UserBadge from './UserBadge';

function UserPreview({ user }) {
  return (
    <Link route="profile" params={{ slug: user.slug }}>
      <a>
        <div className="wrapper">
          <style jsx>{`
            .wrapper {
              width: 13em;
              margin: 0.5em;
              padding-top: 1.5em;
              border-radius: 5px;
              box-shadow: 0 1px 3px #A78100;
              text-align: center;
            }

            .userName {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              width: 90%;
              display: inline-block;
            }
          `}</style>
          <UserBadge user={user} />
          <p className="userName">
            {`${user.givenName} ${user.familyName}`}
          </p>
        </div>
      </a>
    </Link>
  );
}

UserPreview.fragments = {
  user: gql`    
    fragment UserPreview on Member {
      slug
      givenName
      familyName
      ...UserBadge
    }
    ${UserBadge.fragments.user}
  `,
};

UserPreview.propTypes = {
  user: propType(UserPreview.fragments.user).isRequired,
};

export default UserPreview;
