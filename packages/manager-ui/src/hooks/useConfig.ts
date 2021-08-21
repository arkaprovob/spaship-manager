import { useState, useEffect } from "react";
import { IConfig, WebsiteConfig } from "../config";

const configsKey = "spaship-configs";
const selectedKey = "spaship-selected-config";
const websiteKey = "spaship-website-config";

const useConfig = () => {
  const [configs, setConfigs] = useState<IConfig[]>((window as any).SPAship.configs);
  const [selected, setSelected] = useState<IConfig>();
  const [env, setEnv] = useState<any>((window as any).SPAship.env);
  const [website, setWebsite] = useState<string>("");

  const saveStorage = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.error(err);
    }
  };

  const saveConfigs = (newConfigs: IConfig[]) => {
    try {
      localStorage.setItem(configsKey, JSON.stringify(newConfigs));
    } catch (err) {
      console.error(err);
    }
  };

  const addConfig = (conf: IConfig) => {
    const newConfigs = [...configs, conf];
    saveStorage(configsKey, JSON.stringify(newConfigs));
    setConfigs(newConfigs);
  };


  const addEnv = (env: any) => {
    const envConfigs = env;
    saveStorage(env, JSON.stringify(envConfigs));
    setEnv(envConfigs);
  };

  const removeConfig = (name: string) => {
    const newConfigs = configs.filter((conf) => conf.name !== name);
    saveConfigs(newConfigs);
    setConfigs(newConfigs);
  };

  const setSelectedConfig = (conf: IConfig) => {
    setSelected(conf);
    saveStorage(selectedKey, conf.name);
  };

  const setWebsiteConfig = (conf: WebsiteConfig) => {
    setWebsite(conf.name);
    saveStorage(websiteKey, conf.name);
  };

  useEffect(() => {
    const localConfigsJSON = localStorage.getItem(configsKey);
    if (localConfigsJSON !== null) {
      const all = [...configs];
      const localConfigs: IConfig[] = JSON.parse(localConfigsJSON);

      localConfigs.forEach((conf) => {
        if (configs.find((c) => c.name === conf.name)) {
        } else {
          all.push(conf);
        }
      });
      setConfigs(all);
    }
  }, [configs, env, website]);

  useEffect(() => {
    const selectedName = localStorage.getItem(selectedKey);
    const selectedWebsite = localStorage.getItem(websiteKey);
    const selectedConfig = configs.find((conf) => conf.name === selectedName);
    setSelected(selectedConfig);
    setWebsite(selectedWebsite || "");
  }, [configs]);

  return {
    configs,
    selected,
    env,
    website,
    setSelectedConfig,
    addConfig,
    removeConfig,
    setWebsiteConfig,
  };
};

export default useConfig;
