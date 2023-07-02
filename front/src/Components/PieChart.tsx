import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Grid } from "@mui/material";
import { ReactNode } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ datas }) => {

    const keys = Object.keys(datas)
    const values = keys.map((key) => datas[key].length)
    const colors = generateColors(values.length)
    const borderColors = colors.map((color) => color.replace('0.2', '1'))

    const data = {
        labels: keys,
        datasets: [
            {
                label: 'Graphique',
                data: values,
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };
    return (<Grid sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
        maxWidth: '900px',
    }}>
        <Pie data={data} />
    </Grid>);
};

function generateColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const color = `rgba(${ getRandomValue(0, 255) }, ${ getRandomValue(0, 255) }, ${ getRandomValue(0, 255) }, 0.2)`;
        colors.push(color);
    }
    return colors;
}

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}