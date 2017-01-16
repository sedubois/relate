import NProgress from 'nprogress';
import Router from 'next/router';

export default function configureLoadingProgressBar() {
  Router.onRouteChangeStart = () => NProgress.start();
  Router.onRouteChangeComplete = () => NProgress.done();
  Router.onRouteChangeError = () => NProgress.done();
}
