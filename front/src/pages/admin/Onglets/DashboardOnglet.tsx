import {useEffect, useState} from "react";
import EventService from "../../../services/EventService";
import {Box, Container, Grid} from "@mui/material";
import {CardCount} from "../../../Components/CardCount";
import {LineChart} from "../../../Components/LineChart";
import {FormatDataGraph, GroupedDataItem} from "../../../Lib/FormatDataGraph";
import {PieChart} from "../../../Components/PieChart";
import {LineChartMultiple} from "../../../Components/LineChartMultiple";

type EventType = string;

type Event = {
    eventType: EventType;
    [key: string]: any; // remplacez 'any' par le type réel des autres éléments si possible
    timestamp: string;
};

type GroupedEvents = {
    [eventType: string]: Event[];
};

export const DashboardOnglet = () => {
    const [formattedData, setFormattedData] = useState<GroupedEvents>({});
    const [dataPie, setDataPie] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    const getEvents = () => {
        EventService.getEvents().then((events: any[]) => {
            setFormattedData(filterEvents(events));
            setDataPie(filterPie(events))
            setLoading(false);
        }).catch(error => console.error('Erreur:', error));
    };

    useEffect(() => {
        getEvents();
    }, []);

    const filterPie = (events: any) => {
        const datasPie = events.filter((event: any) => event.eventType === "RegistrationFailed" || event.eventType === "RegistrationSuccess")
        return datasPie.reduce((result, item) => {
            const {eventType} = item;
            if (!result[eventType]) {
                result[eventType] = []; // Initialize an empty array for the eventType
            }

            result[eventType].push(item); // Push the item into the corresponding array

            return result;
        }, {});
    }

    const filterEvents = (events: Event[]): GroupedEvents => {
        return events.reduce((result: GroupedEvents, item: Event) => {
            const {eventType} = item;

            if (!result[eventType]) {
                result[eventType] = []; // Initialisez un tableau vide pour le eventType
            }

            result[eventType].push(item); // Pousser l'élément dans le tableau correspondant

            return result;
        }, {});
    };
    return (
        !loading && (
            <Container>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 8,
                    }}
                >
                    <Grid
                        container
                        sm={12}

                        spacing={5}
                    >
                        {
                            formattedData && Object.keys(formattedData).map((key: any, index: number) => {
                                return (
                                    <Grid item>
                                        <CardCount
                                            positive
                                            sx={{height: '100%'}}
                                            value={formattedData[key].length}
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
                            formattedData &&
                            <LineChartMultiple
                                labels={Object.keys(formattedData)}
                                datas={formattedData}
                            />
                        }
                        {
                            formattedData && Object.keys(formattedData).map((key: any, index: number) => {
                                const datas = FormatDataGraph(formattedData[key])
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
    );
};