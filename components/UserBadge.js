import css from 'next/css';
import gql from 'graphql-tag';
import Fragment from 'graphql-fragments';

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
  user: new Fragment(gql`
    fragment UserBadge on User {
      picture
    }
  `),
};

UserBadge.propTypes = {
  user: UserBadge.fragments.user.propType,
};

export default UserBadge;
