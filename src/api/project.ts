import { fetcher, get } from './fetcher'

// 添加项目
export const postProject = (params: any) => {
  return fetcher('/api/project', {
    method: 'post',
    body: JSON.stringify(params)
  })
}
// 获取项目列表
export const getProject = (params?: any) => {
  return get('/api/project/page', params)
    .then((res) => ({
      total: res.total,
      list: res.content,
    }));
}
// 获取项目详情
export const getProjectById = (id: number) => {
  return get(`/api/project/${id}`)
}
// 获取内置的环境列表
export const getEnvs = () => {
  return get(`/api/env`)
}
// 获取内置的平台信息
export const getPlatform = () => {
  return get(`/api/platform`)
}
// 完善项目信息
export const completeProjectById = (id: number, formValue: any) => {
  return fetcher(`/api/project/complete/${id}`, {
    method: 'put',
    body: JSON.stringify(formValue)
  })
}