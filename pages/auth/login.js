import { PropTypes } from 'react';
import NoSSR from 'react-no-ssr';
import Lock from '../../components/Lock';
import page from '../../hocs/page';

const Login = ({ auth: { loggedIn }, url }) => (
  <NoSSR>
    <Lock loggedIn={loggedIn} url={url} />
  </NoSSR>
);

Login.propTypes = {
  url: PropTypes.object.isRequired,
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

export default page(Login);
