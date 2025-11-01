const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { ...(options.headers || {}) };
  // Only set Content-Type to application/json if body is not FormData
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { message: text || res.statusText }; }
    const err = new Error(data.message || 'Request failed');
    err.response = { status: res.status, data };
    throw err;
  }
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

const api = {
  get: (path) => request(path, { method: 'GET' }),
  post: (path, body) => {
    const bodyData = body instanceof FormData ? body : JSON.stringify(body);
    return request(path, { method: 'POST', body: bodyData });
  },
  put: (path, body) => {
    const bodyData = body instanceof FormData ? body : JSON.stringify(body);
    return request(path, { method: 'PUT', body: bodyData });
  },
  delete: (path, body) => {
    const options = { method: 'DELETE' };
    if (body) options.body = JSON.stringify(body);
    return request(path, options);
  },
};

export default api;


