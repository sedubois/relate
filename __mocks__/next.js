module.exports = () => ({
  prepare: () => Promise.resolve(),
  getRequestHandler: () => (req, res) => res.send('Welcome to Next.js!'),
  renderToHTML: () => Promise.resolve('Welcome to Next.js!'),
});
