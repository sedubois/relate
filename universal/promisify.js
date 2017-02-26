module.exports = function promisify(obj, method) {
  return (...args) => new Promise((resolve, reject) => {
    obj[method](...args, (err, res) => (err ? reject(err) : resolve(res)));
  });
};
