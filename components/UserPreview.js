import React from 'react';
import css from 'next/css';
import gql from 'graphql-tag';
import Fragment from 'graphql-fragments';
import NavLink from './NavLink';
import UserBadge from './UserBadge';
import defaultStyle from '../styles/PreviewCard';

function UserPreview({ style = defaultStyle, user }) {
  return (
    <NavLink
      className={style.wrapper}
      href={`/profile?slug=${user.slug}`}
    >
      <UserBadge user={user} />
      <p className={css(style.p)}>{`${user.givenName} ${user.familyName}`}</p>
    </NavLink>
  );
}

UserPreview.fragments = {
  user: new Fragment(gql`    
    fragment UserPreviewUser on User {
      slug
      givenName
      familyName
      ...UserBadgeUser
    }
  `, UserBadge.fragments.user),
};

UserPreview.propTypes = {
  style: defaultStyle.propType,
  user: UserPreview.fragments.user.propType,
};

export default UserPreview;
