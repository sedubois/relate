import css from 'next/css';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';

function UserBadge({ user: { picture } }) {
  return (
    <img
      className={css({
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        objectFit: 'cover',
        padding: '1px',
        border: '3px solid #FF9965',
      })}
      src={picture}
      alt="avatar"
    />
  );
}

UserBadge.fragments = {
  user: gql`
    fragment UserBadge on User {
      picture
    }
  `,
};

UserBadge.propTypes = {
  user: propType(UserBadge.fragments.user).isRequired,
};

export default UserBadge;
