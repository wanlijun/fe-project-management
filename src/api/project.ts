import { fetcher, get } from './fetcher'

export const postProject = (params: any) => {
  return fetcher('/api/project', {
    method: 'post',
    body: JSON.stringify(params)
  })
}
export const getProject = (params?: any) => {
  return get('/api/project/page', params)
    .then((res) => ({
      total: res.total,
      list: res.content,
    }));
}