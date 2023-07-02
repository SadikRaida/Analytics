import { useEffect, useState } from "react";
import EventService from "../../../services/EventService";
import { Box, Container, Grid } from "@mui/material";
import { CardCount } from "../../../Components/CardCount";
import { LineChart } from "../../../Components/LineChart";
import { FormatDataGraph, GroupedDataItem } from "../../../Lib/FormatDataGraph";

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
    const [loading, setLoading] = useState<boolean>(true);

    const getEvents = () => {
        EventService.getEvents().then((events: any[]) => {
            setFormattedData(filterEvents(events));
            setLoading(false);
        }).catch(error => console.error('Erreur:', error));
    };

    useEffect(() => {
        getEvents();
    }, []);

    const filterEvents = (events: Event[]): GroupedEvents => {
        return events.reduce((result: GroupedEvents, item: Event) => {
            const { eventType } = item;

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
                    <Grid container sm={12} spacing={5}>
                        {formattedData &&
                            Object.keys(formattedData).map((key: string) => {
                                return (
                                    <Grid item key={key}>
                                        <CardCount
                                            positive={true}
                                            sx={{ height: '100%' }}
                                            value={formattedData[key].length}
                                            fieldName={key}
                                        />
                                    </Grid>
                                );
                            })}
                    </Grid>
                    <Grid
                        container
                        spacing={5}
                        sx={{
                            marginTop: 5,
                        }}
                    >
                        {formattedData &&
                            Object.keys(formattedData).map((key: string) => {
                                const datas: GroupedDataItem[] = FormatDataGraph(formattedData[key]);
                                return (
                                    <Grid key={key} sm={12} sx={{ height: '100%', width: '100%' }}>
                                        <LineChart datas={datas} title={key} />
                                    </Grid>
                                );
                            })}
                    </Grid>
                </Box>
            </Container>
        )
    );
};