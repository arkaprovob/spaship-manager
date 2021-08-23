import { Button, Gallery, GalleryItem, Level, LevelItem, PageSection, PageSectionVariants, Title } from "@patternfly/react-core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IConfig } from "../../../config";
import useConfig from "../../../hooks/useConfig";
import Page from "../../../layout/Page";
import { get } from "../../../utils/APIUtil";
import NewPropertyModal from "../../property/NewPropertyModal";
import SearchFilter from "../../property/SearchFilter";
import DashboardProperty from "./DashboardSPAProperty";
import LatestActivitiesBySPA from "./LatestActivitiesBySPA";
import SPAEnvChart from "./SPAEnvChart";
import SPAEnvMonthChart from "./SPAEnvMonthChart";

export default () => {
  const {  selected, setSelectedConfig, env } = useConfig();
  const { spaName, propertyName } = useParams<{ spaName: string, propertyName: string }>();
  const [event, setEvent] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const getEventData = fetchEventData(selected, spaName, setEvent, propertyName, env);

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
  const eventResponse = getEventResponse(event);

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
    <Page title="Dashboard - SPA Deployment Analysis" titleToolbar={titleToolbar}>
      <PageSection variant={PageSectionVariants.light} isFilled>
        <Gallery hasGutter style={{ width: "90%" }}>
          {eventResponse.map((e) => (
            <GalleryItem key={e.id} >
              <DashboardProperty config={e} selectedName={e.env} />
            </GalleryItem>
          ))}
        </Gallery>
      </PageSection>

      <PageSection variant={PageSectionVariants.default}>
        <Title headingLevel="h1">SPA Analysis</Title>
        <Gallery hasGutter style={{ width: "90%" }}>
          <GalleryItem >
            <SPAEnvChart></SPAEnvChart>
          </GalleryItem>
          <GalleryItem >
            <SPAEnvMonthChart></SPAEnvMonthChart>
          </GalleryItem>
        </Gallery>
        <Title headingLevel="h1">SPA Latest Activites</Title>
        <br></br>
        <LatestActivitiesBySPA />
      </PageSection>
    </Page>
  );
};

function getEventResponse(event: never[]) {
  const eventResponse = [];
  let propertyName = '';
  if (event) {
    for (let item of event) {
      const value = JSON.parse(JSON.stringify(item));
      eventResponse.push(value);
      propertyName = value.propertyName;
    }
  }
  return eventResponse;
}

function fetchEventData(selected: IConfig | undefined, spaName: string, setEvent: any, propertyName: any, env: any) {
  return async () => {
    try {
      const url = env.managerPath + `/event/get/property/spaname/count/${spaName}/${propertyName}`;
      if (url) {
        const data = await get<any>(url);
        setEvent(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
}

