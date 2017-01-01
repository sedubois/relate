import config from '../config';

export default () => (
  <div>
    <link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css" />
    <div
      id="mc_embed_signup"
      style={{ background: '#fff', clear: 'left', font: '14px Helvetica,Arial,sans-serif', width: '100%' }}
    >
      <form
        action={config.NEWSLETTER_FORM_ACTION}
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
        noValidate
      >
        <div id="mc_embed_signup_scroll">
          <input
            type="email"
            name="EMAIL"
            className="email"
            id="mce-EMAIL"
            placeholder="email address"
            required
          />
          {/* <!-- real people should not fill this in and expect good things
                 - do not remove this or risk form bot signups --> */}
          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
            <input type="text" name={config.NEWSLETTER_FORM_INPUT_NAME} tabIndex="-1" value="" />
          </div>
          <div className="clear">
            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
          </div>
        </div>
      </form>
    </div>
  </div>
);
