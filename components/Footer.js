import css from 'next/css';

const Footer = () => (
  <footer
    className={css({
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '4em',
      padding: '2em 0',
      borderTop: '1px solid #3B2400',
    })}
  >
    <section>
      <a href="https://github.com/relatemindfulness/relate" target="_blank" rel="noopener noreferrer">GitHub</a>
    </section>
    <section>
      Made with ღ by&nbsp;
      <a href="https://twitter.com/semdubois" target="_blank" rel="noopener noreferrer">Sébastien Dubois</a>
    </section>
  </footer>
);

export default Footer;
