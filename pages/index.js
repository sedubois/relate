import { FormattedMessage } from 'react-intl';
import GitHubRibbon from '../components/GitHubRibbon';
import SubscribeNewsletter from '../components/SubscribeNewsletter';
import page from '../hocs/page';

export default page(() => (
  <div className="homePage">
    <GitHubRibbon />
    <section className="hero">
      <div className="heroContent heroImage" />
      <div className="heroContent heroText">
        <p>
          <FormattedMessage
            id="Homepage.hero"
            values={{
              meditation: <span><FormattedMessage id="Homepage.hero.meditation" /></span>,
              support: <span><FormattedMessage id="Homepage.hero.support" /></span>,
            }}
          />
        </p>
      </div>
    </section>
    <section className="sectionHead">
      <span>Relate</span> <FormattedMessage id="Homepage.togetherTagline" />
    </section>
    <section className="sectionHead">
      <a
        href="https://medium.com/@sedubois/the-way-we-relate-the-world-we-create-2d8f79300b7f"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FormattedMessage id="Homepage.readMore" />
      </a>
    </section>
    <section className="sectionHead">
      <FormattedMessage id="Homepage.subscribeNewsletter" />
      <SubscribeNewsletter />
    </section>
    <style jsx>{`
      .homePage {
        margin: 1em 0;
        text-align: center;
      }

      img {
        float: left;
        width: 480px;
        height: 320px;
      }

      .sectionHead {
        font-size: 2em;
        padding: 2em 1em;
      }

      .sectionHead > span {
        color: #FFBD1A;
      }

      .sectionHead:nth-child(even) {
        background-color: #F9F9F9;
      }

      .hero {
        display: flex;
        flex-wrap: wrap;
      }

      .heroContent {
        flex-grow: 1;
        width: 330px;
        display: flex;
        flex-direction: column;
      }

      .heroImage {
        background: url(/static/homepage/bg_TimMarshall.jpg) no-repeat center center;
        background-size: cover;
        min-height: 150px;
      }

      .heroText {
        color: white;
        background-color: #FF9933;
        justify-content: center;
      }

      .heroText p {
        font-size: 2em;
        padding: 0 40px;
      }

      .heroText p span {
        color: #FFECBD;
      }

      @media screen and (min-width: 790px) {
        .heroImage {
          min-height: 300px;
        }

        .heroText {
          font-size: 120%;
        }
      }
    `}</style>
  </div>
));
