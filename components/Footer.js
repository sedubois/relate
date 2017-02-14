import { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { mapDispatchToSetLocale } from '../data/intl/lib';
import locales from '../universal/locales';
import pkg from '../package';

const Footer = ({ locale, setLocale }) => (
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
      <select
        defaultValue={locale}
        onChange={event => setLocale(event.target.value)}
      >
        {locales.map(l => <option key={l} value={l}>{l}</option>)}
      </select>
    </section>
    <section>
      <FormattedMessage
        id="Footer.madeBy"
        values={{
          author: <a href="https://sdubois.now.sh" target="_blank" rel="noopener noreferrer">Sébastien Dubois</a>,
        }}
      />
    </section>
    <section>
      v{pkg.version}
    </section>
  </footer>
);

Footer.propTypes = {
  locale: PropTypes.string.isRequired,
  setLocale: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToSetLocale)(Footer);
