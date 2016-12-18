import css from 'next/css';

const Footer = () => (
  <footer
    className={css({
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '2em',
      padding: '2em 0',
      borderTop: '1px solid #3B2400',
    })}
  >
    <section>
      <a href="https://medium.com/tag/relatemind" target="_blank" rel="noopener noreferrer">Medium</a> &nbsp;
      <a href="https://github.com/relatemind/relate" target="_blank" rel="noopener noreferrer">GitHub</a> &nbsp;
      <a href="https://relate-slack.herokuapp.com/" target="_blank" rel="noopener noreferrer">Slack</a> &nbsp;
    </section>
    <section>
      Made with ღ by&nbsp;
      <a href="https://sdubois.now.sh" target="_blank" rel="noopener noreferrer">Sébastien Dubois</a>
    </section>
  </footer>
);

export default Footer;
