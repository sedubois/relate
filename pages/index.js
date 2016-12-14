import css from 'next/css';
import GitHubRibbon from '../components/GitHubRibbon';
import page from '../hocs/page';

export default page(() => <div>
  <GitHubRibbon />
  <div
    className={css({
      maxWidth: '600px',
      margin: 'auto',
    })}
  >
    <br />
    Welcome! This prototype aims to assemble the technology stack required to scale
    a platform around the practice of mindfulness, with
    a focus on community support and engagement. Current mindfulness apps offer
    little for practicing mindfulness with the help of a community,
    although it is an essential part of this life-changing practice.
    <br />
    <br />
    An in-depth explanation of the project&#39;s vision will very soon be published on&nbsp;
    <a href="https://medium.com/@sedubois">Medium</a>. If you wish to give any feedback,
    join the discussion on <a href="https://relatemindfulness.slack.com/">Slack</a>.
    </div>
</div>);
