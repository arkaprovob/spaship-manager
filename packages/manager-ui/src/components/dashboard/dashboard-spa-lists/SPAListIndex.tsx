import { Gallery, GalleryItem, PageSection, PageSectionVariants, Title } from "@patternfly/react-core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IConfig } from "../../../config";
import Page from "../../../layout/Page";
import { get } from "../../../utils/APIUtil";
import DashboardProperty from "../DashboardIndexProperty";
import LatestActivitiesByProperty from "../LatestActivitiesByProperty";
import PropertyEnvChart from "../PropertyEnvChart";
import PropertyEnvMonthChart from "../PropertyEnvMonthChart.jsx";
import PropertyTimeToDeployChart from "../PropertyTimeToDeployChart";
import { Button, Level, LevelItem } from "@patternfly/react-core";
import SearchFilter from "../../property/SearchFilter";
import NewPropertyModal from "../../property/NewPropertyModal";
import useConfig from "../../../hooks/useConfig";
import SPAListForWebsites from "./SPAListForWebsites";

export default () => {
  const { selected, website, setSelectedConfig, env } = useConfig();
  const { propertyName } = useParams<{ propertyName: string }>();
  const [event, setEvent] = useState([]);
  const history = useHistory();
  const [isModalOpen, setModalOpen] = useState(false);

  // const handleRemove = (conf: IConfig) => {
  //   removeConfig(conf.name);
  // };

  const onSelect = async (spaName: string, propertyName: string) => {
    history.push(`/dashboard/${propertyName}/spaName/${spaName}`);
  };

  const getEventData = fetchEventData(selected, propertyName, setEvent, env);

  useEffect(() => {
    getEventData();
  }, [selected]);

  const handleSubmit = (conf: IConfig) => {
    setModalOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleClick = () => {
    setModalOpen(true);
  };

  const eventResponse = [];
  if (event) {
    for (let item of event) {
      const value = JSON.parse(JSON.stringify(item));
      eventResponse.push(value);
    }
  }

  const titleToolbar = (
    <>
      <Level hasGutter>
        <LevelItem>
          <SearchFilter></SearchFilter>
        </LevelItem>
        <LevelItem>
          <Button onClick={handleClick} id="add-application-button" variant="primary">
            Add New Repository
          </Button>
        </LevelItem>
      </Level>
      <NewPropertyModal isModalOpen={isModalOpen} onClose={handleClose} onSubmit={handleSubmit} />
    </>
  );

  return (
    <>
      <Page title="Dashboard - SPA List" titleToolbar={titleToolbar}>
        <PageSection variant={PageSectionVariants.light} isFilled>
          <Gallery hasGutter style={{ width: "90%" }}>
            {eventResponse.map((e) => (
              <GalleryItem key={e.id} >
                <SPAListForWebsites config={e} selectedName={e.spaName} propertyName={propertyName} onSelect={onSelect} />
              </GalleryItem>
            ))}
          </Gallery>
        </PageSection>
      </Page>
    </>
  );
};

function fetchEventData(selected: IConfig | undefined, propertyName: string, setEvent: any, env: any) {
  return async () => {
    try {
      const url = env.managerPath + `/website/getSpaList/${propertyName}`;
      setEvent([]);
      const response = [];
      if (url) {
        const data = await get<any>(url);
        console.log(data);
        for (let item of data) {
          let spas = item?.spa;
          for (let eachSpa of spas) {
            response.push({ spaName: eachSpa.spaName, 
                            envs: eachSpa.envs, 
                            contextPath: eachSpa.contextPath, 
                            repositoryLink: item.repositoryConfigs.repositoryLink,
                            createdAt: item.createdAt
            });
          }
        }
      }
      setEvent(response);
    }
    catch (e) {
      console.log(e);
    }
  };
}