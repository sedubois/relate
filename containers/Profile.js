import React from 'react';
import css from 'next/css';
import gql from 'graphql-tag';
import apollo from './Apollo';
import NotFound from '../components/NotFound';
import UserPreview from '../components/UserPreview';

const userPreviewStyle = {
  wrapper: {
    display: 'inline-flex',
    marginBottom: '1em',
    fontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  p: {
    margin: 'auto 1em',
    fontSize: 'larger',
    fontWeight: 'bold',
    textAlign: 'right',
    borderBottom: '1px solid #FFC500',
    width: 'inherit',
  },
};

const Profile = ({ data: { User } }) => {
  if (!User) {
    return <NotFound />;
  }
  return (
    <div
      className={css({
        margin: '0 1em',
      })}
    >
      {/* TODO find cleaner way to pass the style */}
      <UserPreview
        style={userPreviewStyle}
        user={UserPreview.fragments.user.filter(User)}
        link={false}
      />
    </div>
  );
};

Profile.propTypes = {
  data: React.PropTypes.shape({
    User: React.PropTypes.object,
  }).isRequired,
};

// TODO get slug from URL parameters
const query = gql`{
  User(slug: "clang") {
    ...UserPreviewUser
  }
}`;

const withData = apollo(query, {
  options: {
    fragments: UserPreview.fragments.user.fragments(),
  },
});

export default withData(Profile);
