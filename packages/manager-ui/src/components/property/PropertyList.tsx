import { Gallery, GalleryItem, Page, PageSection, PageSectionVariants, Title } from "@patternfly/react-core";
import { count } from "console";
import { config } from "process";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IConfig } from "../../config";
import useConfig from "../../hooks/useConfig";
import Header from "../../layout/Header";
import { get } from "../../utils/APIUtil";
import EnvChart from "./EnvChart";
import EnvMonthChart from "./EnvMonthChart";
import LatestActivities from "./LatestActivities";
import NewProperty from "./NewProperty";
import Property from "./Property";

export default () => {
  const { configs, selected, setSelectedConfig, setWebsiteConfig, addConfig, removeConfig, env } = useConfig();
  const [event, setEvent] = useState<any>([]);
  const [websitelist, setWebsiteList] = useState<any>([]);
  const history = useHistory();

  const handleSubmit = (conf: IConfig) => {
    // addConfig(conf);
  };

  const handleRemove = (conf: IConfig) => {
    removeConfig(conf.name);
  };

  const onSelect = async (conf: any) => {
  //  console.log(conf);
    const websiteConfig = { name: conf.websiteName };
    await setWebsiteConfig(websiteConfig);
    history.push(`/dashboard/property/${conf.websiteName}`);
  };

  const getEventData = fetchEventData(setEvent, env);
  const getWebsiteData = fetchWebsiteData(setWebsiteList, env);

  useEffect(() => {
    getEventData();
    getWebsiteData();
    console.log(websitelist);
  }, [selected]);

  const sortConfigs = getSortConfigs(configs);

  return (
    <Page header={<Header />}>

      <PageSection variant={PageSectionVariants.darker}>
        <Title headingLevel="h1">Choose a website</Title>
      </PageSection>
      <PageSection variant={PageSectionVariants.default}>
        <Gallery hasGutter style={{ width: "100%" }}>
          {websitelist.map((website: any) => (
            <GalleryItem key={`property-${website.id}`}>
              <Property
                config={website}
                selectedName={selected?.name}
                event={event}
                onSelect={onSelect}
                onRemove={handleRemove}
              />
            </GalleryItem>
          ))}
          <NewProperty onSubmit={handleSubmit} />
        </Gallery>
      </PageSection>

      <PageSection variant={PageSectionVariants.default}>
        <Title headingLevel="h1">Environment Analysis</Title>
        <Gallery hasGutter style={{ width: "90%" }}>
          <GalleryItem>
            <EnvChart ></EnvChart>
          </GalleryItem>
          <GalleryItem>
            <EnvMonthChart></EnvMonthChart>
          </GalleryItem>
        </Gallery>
        <Title headingLevel="h1">Latest Activites</Title>
        <br></br>
        <LatestActivities />
      </PageSection>

    </Page>
  );
};

function getSortConfigs(configs: IConfig[]) {
  return configs.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });
}

function fetchEventData(setEvent: any, env: any) {
  return async () => {
    try {
      const url = env.managerPath + "/event/get/all/property/count";

      setEvent([]);
      if (url) {
        const data = await get<any>(url);
        console.log(data);
        setEvent(data);
      }

    } catch (e) {
      console.log(e);
    }
  };
}



function fetchWebsiteData(setWebsiteList: any, env: any) {
  return async () => {
    try {
      const url = env.managerPath + "/website/list";
      setWebsiteList([]);
      if (url) {
        const data = await get<any>(url);
        console.log(data);
        setWebsiteList(data);
      }

    } catch (e) {
      console.log(e);
    }
  };
}

