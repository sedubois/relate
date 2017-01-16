const Footer = () => (
  <footer>
    <style jsx>{`
      footer {
        display: flex;
        justify-content: space-between;
        margin-top: 2em;
        padding: 2em 0;
        border-top: 1px solid #3B2400;
      }
    `}</style>
    <section>
      <a href="https://medium.com/tag/relatenow" target="_blank" rel="noopener noreferrer">Medium</a> &nbsp;
      <a href="https://github.com/relatenow/relate" target="_blank" rel="noopener noreferrer">GitHub</a> &nbsp;
      <a href="https://relate-slack.now.sh" target="_blank" rel="noopener noreferrer">Slack</a> &nbsp;
    </section>
    <section>
      Made with ღ by&nbsp;
      <a href="https://sdubois.now.sh" target="_blank" rel="noopener noreferrer">Sébastien Dubois</a>
    </section>
  </footer>
);

export default Footer;
