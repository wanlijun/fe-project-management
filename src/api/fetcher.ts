

type Fetch = Parameters<typeof fetch>
import { message } from 'antd';
import queryString from 'query-string';

export function fetcher(input: Fetch[0], init?: Fetch[1]) {
  const key = localStorage.getItem('token');
  console.log(key);
  const requestInit = {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
      ...(init ? init.headers : {}),
    },
  };

  return fetch(input, requestInit)
    .then(async (response: any) => {
      if (!response.ok) {
        const error = await response.json()
        if (error.statusCode === 401) {
          message.error('登录已失效，请重新登录')
          location.href = '/login'
        } else {
          message.error(error.message)
        }
        return Promise.reject(error)
      }

      // 根据响应内容类型解析数据
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
      }

      return response.text();
    })
    .catch((error) => {
      // 统一处理fetch请求错误
      console.error('Fetch request failed:', error);
      throw error;
    });
}
export function get(path: string, params?: { [index: string | number]: string }) {
  const query = queryString.stringify(params || {});
  return fetcher(query ? `${path}?${query}` : path , {
    method: 'get',
  })
}