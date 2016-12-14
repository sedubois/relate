import { PropTypes } from 'react';
import css from 'next/css';
import gql from 'graphql-tag';
import Fragment from 'graphql-fragments';
import NavLink from './NavLink';
import UserBadge from './UserBadge';
import defaultStyle from '../styles/PreviewCard';

const Div = ({ className, children }) => <div className={css(className)}>{children}</div>;
Div.propTypes = {
  className: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

function UserPreview({ style = defaultStyle, user, link = true }) {
  const Wrapper = link ? NavLink : Div;
  return (
    <Wrapper
      className={style.wrapper}
      href={`/profile?slug=${user.slug}`}
    >
      <UserBadge user={user} />
      <p className={css(style.p)}>{`${user.givenName} ${user.familyName}`}</p>
    </Wrapper>
  );
}

UserPreview.fragments = {
  user: new Fragment(gql`    
    fragment UserPreview on User {
      slug
      givenName
      familyName
      ...UserBadge
    }
  `, UserBadge.fragments.user),
};

UserPreview.propTypes = {
  style: PropTypes.shape({
    wrapper: PropTypes.object.isRequired,
    p: PropTypes.object.isRequired,
  }),
  user: UserPreview.fragments.user.propType,
  link: PropTypes.bool,
};

export default UserPreview;
