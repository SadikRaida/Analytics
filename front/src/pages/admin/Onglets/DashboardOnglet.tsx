import { useEffect, useState } from "react";
import EventService from "../../../services/EventService";
import { Box, Container, Grid } from "@mui/material";
import { CardCount } from "../../../Components/CardCount";
import { LineChart } from "../../../Components/LineChart";
import { FormatDataGraph } from "../../../Lib/FormatDataGraph";
import { PieChart } from "../../../Components/PieChart";
import {LineChartMultiple} from "../../../Components/LineChartMultiple";

export const DashboardOnglet = () => {
    const [formatedData, setFormatedData] = useState<any>({});
    const [dataPie, setDataPie] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getUsers = () => {
        EventService.getEvents().then((events: any) => {
            setFormatedData(filterEvents(events));
            setDataPie(filterPie(events));
        });
    };

    useEffect(() => {
        getUsers();
        setLoading(false);
    }, []);

    const filterPie = (events: any) => {
        const datasPie = events.filter(
            (event: any) =>
                event.eventType === "RegistrationPageVisited" ||
                event.eventType === "RegistrationFailed" ||
                event.eventType === "RegistrationSuccess"
        );
        return datasPie.reduce((result: any, item: any) => {
            const { eventType } = item;
            if (!result[eventType]) {
                result[eventType] = []; // Initialize an empty array for the eventType
            }

            result[eventType].push(item); // Push the item into the corresponding array

            return result;
        }, {});
    };

    const filterEvents = (events: any) => {
        return events.reduce((result: any, item: any) => {
            const { eventType } = item;
            if (!result[eventType]) {
                result[eventType] = []; // Initialize an empty array for the eventType
            }

            result[eventType].push(item); // Push the item into the corresponding array

            return result;
        }, {});
    };

    console.log(formatedData);

    return (
        !loading && (
            <Container>
                Votre Dashboard
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 8,
                    }}
                >
                    <Grid container sm={12} spacing={5}>
                        {Object.keys(formatedData).map((key: any) => {
                            return (
                                <Grid item key={key}>
                                    <CardCount
                                        positive
                                        sx={{ height: "100%" }}
                                        value={formatedData[key].length}
                                        fieldName={key}
                                    />
                                </Grid>
                            )
                        })
                        }
                    </Grid>
                    <Grid
                        container
                        sm={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            maxWidth: '500px',
                        }}
                        spacing={5}
                    >
                        {
                            dataPie &&
                            <PieChart
                                datas={dataPie}
                            />
                        }
                    </Grid>
                    <Grid
                        container
                        spacing={5}
                        sx={{
                            marginTop: 5
                        }}
                    >
                        {
                            formatedData &&
                            <LineChartMultiple
                                labels={Object.keys(formatedData)}
                                datas={formatedData}
                            />
                        }
                        {
                            formatedData && Object.keys(formatedData).map((key: any, index: number) => {

                                const datas = FormatDataGraph(formatedData[key])
                                return <Grid key={key} sm={12} sx={{
                                    height: '100%',
                                    width: '100%'
                                }}>
                                    <LineChart
                                        datas={datas}
                                        title={key}
                                    />
                                </Grid>
                            })
                        }
                    </Grid>
                </Box>
            </Container>
        )
    )
}
