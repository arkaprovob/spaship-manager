import { useState, useEffect } from "react";
import { IConfig, SPAConfig, WebsiteConfig } from "../config";

const configsKey = "spaship-configs";
const selectedKey = "spaship-selected-config";
const websiteKey = "spaship-website-config";

const useConfig = () => {
  const [selected, setSelected] = useState<IConfig>();
  const [env, setEnv] = useState<any>("http://localhost:3000/api/v1");
  const [website, setWebsite] = useState<string>("");
  const [spa, setSPA] = useState<string>("");

  const saveStorage = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.error(err);
    }
  };



  const setSelectedConfig = (conf: IConfig) => {
    setSelected(conf);
    saveStorage(selectedKey, conf.name);
  };

  const setWebsiteConfig = (conf: WebsiteConfig) => {
    setWebsite(conf.name);
    saveStorage(websiteKey, conf.name);
  };

  const setSPAConfig = (conf: any) => {
    setSPA(conf.name);
  };

  useEffect(() => {
  }, [env, website]);

  useEffect(() => {
    const selectedName = localStorage.getItem(selectedKey);
    const selectedWebsite = localStorage.getItem(websiteKey);
    // const selectedConfig = configs.find((conf) => conf.name === selectedName);
    //  setSelected(selectedConfig);
    setWebsite(selectedWebsite || "");
  }, []);

  return {
    selected,
    env,
    spa,
    website,
    setSelectedConfig,
    setSPAConfig,
    setWebsiteConfig,
  };
};

export default useConfig;
