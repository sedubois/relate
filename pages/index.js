import GitHubRibbon from '../components/GitHubRibbon';
import SubscribeNewsletter from '../components/SubscribeNewsletter';
import pageWithData from '../hocs/page';

export default pageWithData(() => (
  <div className="homePage">
    <GitHubRibbon />
    <section className="hero">
      <div className="heroContent heroImage" />
      <div className="heroContent heroText">
        <p>
          Transforming lives through<br />
          <span>meditation</span> and<br />
          <span>mutual support</span>
        </p>
      </div>
    </section>
    <section className="sectionHead">
      <span>Relate</span> brings together mindfulness communities, teachers and individuals
    </section>
    <section className="sectionHead">
      <a
        href="https://medium.com/@sedubois/the-way-we-relate-the-world-we-create-2d8f79300b7f"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read the article on Medium
      </a>
    </section>
    <section className="sectionHead">
      Subscribe to the newsletter
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
