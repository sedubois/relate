import { PropTypes } from 'react';
import NoSSR from 'react-no-ssr';
import Lock from '../../components/Lock';
import page from '../../hocs/page';

const Login = ({ auth, url, locale }) => (
  <NoSSR>
    <Lock auth={auth} url={url} locale={locale} />
  </NoSSR>
);

Login.propTypes = {
  url: PropTypes.object.isRequired,
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
  locale: PropTypes.string.isRequired,
};

export default page(Login);
