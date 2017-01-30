// `fetch` uses Service Workers which don't share the HTTP session:
// instead use XHRs when you need access to the HTTP session data.

export default function execXhr({ method = 'POST', url, payload } = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new window.XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          return resolve(JSON.parse(xhr.responseText));
        }
        return reject(Error(`XHR unexpected error for URL ${url}`));
      }
      return null;
    };
    xhr.onerror = () => reject(Error(`XHR error for URL ${url}`));
    xhr.send(JSON.stringify(payload));
    return null;
  });
}
