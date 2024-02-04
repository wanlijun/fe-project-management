import { getOptions } from '@/utils/common';
export const DEPLOY_METHOD = [
  "合并到prod",
  "合并到pre",
  "合并到test",
  "jenkins部署",
  "运维手动部署"
]
export const DEPLOY_OPTIONS = getOptions(DEPLOY_METHOD)
