export interface IEnvironment {
  name: string;
  api: string;
  domain: string;
}

export interface IConfig {
  name: string;
  isPreset?: boolean;
  environments: IEnvironment[];
}


export interface SPAConfigutation {
  websiteName: string;
  repositoryConfigs?: RepositoryConfigs[],
};


export interface RepositoryConfigs {
  repositoryLink: string;
  branch: string;
  gitToken: string;
  spas?: SPAConfig[];
}

export interface SPAConfig {
  spaName: string;
  contextPath?: string;
  envs?: string[]
}


export interface WebsiteConfig {
  name: string;
}

export interface SPAConfig {
  name: any;
}