import React from 'react';
import GitHubRibbon from '../components/GitHubRibbon';
import page from '../hocs/page';

export default page(() => <div>
  <GitHubRibbon />
  Welcome!
</div>);
