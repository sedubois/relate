module.exports = function promisify(obj, method) {
  return (...args) => new Promise((resolve, reject) => {
    const handle = obj[method](...args, (err, res) => (err
      ? reject(err)
      : resolve(Object.assign(res || {}, { handle }))));
  });
};
