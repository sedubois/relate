import React from 'react';
import css from 'next/css';
import gql from 'graphql-tag';
import Fragment from 'graphql-fragments';
import NavLink from './NavLink';
import UserBadge from './UserBadge';
import defaultStyle from '../styles/PreviewCard';

const Div = ({ className, children }) => <div className={css(className)}>{children}</div>;
Div.propTypes = {
  className: React.PropTypes.object.isRequired,
  children: React.PropTypes.node.isRequired,
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
    fragment UserPreviewUser on User {
      slug
      givenName
      familyName
      ...UserBadgeUser
    }
  `, UserBadge.fragments.user),
};

UserPreview.propTypes = {
  style: React.PropTypes.shape({
    wrapper: React.PropTypes.object.isRequired,
    p: React.PropTypes.object.isRequired,
  }),
  user: UserPreview.fragments.user.propType,
  link: React.PropTypes.bool,
};

export default UserPreview;
