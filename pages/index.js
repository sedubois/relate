import GitHubRibbon from '../components/GitHubRibbon';
import SubscribeNewsletter from '../components/SubscribeNewsletter';
import page from '../hocs/page';

export default page(() => <div>
  <GitHubRibbon />
  <div className="homePage">
    <section>
      <img alt="practice together" src="/static/homepage/bg_TimMarshall.jpg" />
      <div className="heroText">
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
        margin: 30px 0;
        text-align: center;
      }

      img {
        float: left;
        width: 480px;
        height: 320px;
      }

      .sectionHead {
        margin: 2em;
        font-size: 2em;
      }

      .sectionHead > span {
        color: #FFBD1A;
      }

      .heroText {
        color: white;
        background-color: #FF9933;
        display: flex;
        flex-direction: column;
        height: 320px;
        justify-content: center;
      }

      .heroText p {
        font-size: 3em;
        padding: 50px;
      }

      .heroText p span {
        color: #FFECBD;
      }
    `}</style>
  </div>
</div>);
