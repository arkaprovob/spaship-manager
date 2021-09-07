import { ChartDonut, ChartThemeColor } from '@patternfly/react-charts';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IConfig } from '../../config';
import useConfig from '../../hooks/useConfig';
import { get } from '../../utils/APIUtil';


export default () => {
    const { selected, setSelectedConfig, env } = useConfig();
    const [event, setEvent] = useState([]);
    const { spaName } = useParams<{ spaName: string }>();

    const getEventData = fetchEventData(selected, setEvent, env);

    useEffect(() => {
        getEventData();
    }, [selected]);

    const chartData = [];
    const labelData = [];
    let count: any;
    count = 0;
    if (event) {
        for (let item of event) {
            const value = JSON.parse(JSON.stringify(item));
            count += value.count;
            const dataPoint = {
                x: value.envs,
                y: value.count
            }
            chartData.push(dataPoint);
            const label = {
                name: value.envs + " : " + value.count
            }
            labelData.push(label);
        }
    }


    return (

        <div style={{ height: '230px', width: '350px' }}>
            <ChartDonut
                ariaDesc="Average number of pets"
                ariaTitle="Donut chart example"
                constrainToVisibleArea={true}
                data={chartData}
                legendData={labelData}
                legendOrientation="vertical"
                legendPosition="right"
                padding={{
                    bottom: 20,
                    left: 20,
                    right: 140, // Adjusted to accommodate legend
                    top: 20
                }}
                subTitle="Deployed Env"
                title={count || 0}
                themeColor={ChartThemeColor.multiOrdered}
                width={350}
            />
        </div>
    );
};

function fetchEventData(selected: IConfig | undefined, setEvent: any, env: any) {
    return async () => {
        try {
            const url = env.managerPath + "/event/get/chart/all/property/env";
            setEvent([]);
            if (url) {
                const data = await get<any>(url);
                console.log("Env data");
                console.log(data);
                setEvent(data);
            }
        } catch (e) {
            console.log(e);
        }
    };
}