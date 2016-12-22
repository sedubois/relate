import css from 'next/css';
import GitHubRibbon from '../components/GitHubRibbon';
import page from '../hocs/page';

const sectionHeadStyle = css({
  margin: '2em',
  fontSize: '2em',
});

const emphasisStyle = css({
  color: '#FFECBD',
});

const emphasisStyle2 = css({
  color: '#FFBD1A',
});

export default page(() => <div>
  <GitHubRibbon />
  <div
    className={css({
      margin: '30px 0',
      textAlign: 'center',
    })}
  >
    <section>
      <img
        alt="practice together"
        className={css({
          float: 'left',
          width: '480px',
          height: '320px',
        })}
        src="/static/homepage/bg_TimMarshall.jpg"
      />
      <div
        className={css({
          color: 'white',
          backgroundColor: '#FF9933',
          display: 'flex',
          flexDirection: 'column',
          height: '320px',
          justifyContent: 'center',
        })}
      >
        <p
          className={css({
            fontSize: '3em',
            padding: '50px',
          })}
        >
          Transforming lives through<br />
          <span className={emphasisStyle}>meditation</span> and<br />
          <span className={emphasisStyle}>mutual support</span>
        </p>
      </div>
    </section>
    <section className={sectionHeadStyle}>
      <span className={emphasisStyle2}>Relate</span> brings together meditation communities,
      teachers and individuals
    </section>
    <section className={sectionHeadStyle}>
      <a
        href="https://medium.com/@sedubois/the-way-we-relate-the-world-we-create-2d8f79300b7f"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read the article on Medium
      </a>
    </section>
    <section className={sectionHeadStyle}>
      🚧 This is a technology demo - stay tuned 🚧
    </section>
  </div>
</div>);
