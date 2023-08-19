export function sendRequest(url, method, credentials, endpoint, body) {
  const headers = { "Content-Type": "application/json" };
  const config = { method, headers };

  if (credentials) {
    config.credentials = "include";
  }
  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${url}${endpoint}`, config).then((res) => {
    const result = res.json();
    return res.ok
      ? result
      : result.then((err) => Promise.reject(`${err.message}`));
  });
}
