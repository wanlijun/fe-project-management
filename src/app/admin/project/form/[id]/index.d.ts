interface IGitUrl {
  name: string;
  url: string;
}
interface IMethod {
  name: string;
  method: string;
}
interface IDeploy {
  environment: number;
  data: IMethod[]
}
export interface IProject {
  name: string;
  shortName: string;
  brief: string;
  platformIds: number[];
  environmentIds: number[];
  account: IAccounts[];
  frontEndInfo: {
    gitUrlType: 'DETAIL' | 'GROUP';
    gitUrls: IGitUrl[];
    deploy: IDeploy[]
  }
}
export interface IAccounts {
  environmentId: number;
  platformId: number;
  url:  string;
  account: string | string[];
}
export interface IProjectInfo {
  name: string;
  shortName: string;
  brief: string;
  platformIds: number[];
  environmentIds: number[];
  account: IAccounts[];
  frontEndInfo: {
    gitUrlType: 'DETAIL' | 'GROUP';
    gitUrls: IGitUrl[];
    deploy: IDeploy[]
  }
}