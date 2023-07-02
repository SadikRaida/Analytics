import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FormatDataGraph } from "../Lib/FormatDataGraph";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LineChartMultiple = ({ labels, datas }) => {
    // get function from lib folder
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: "title",
            },
        },
    };

    const groupedDates = Object.keys(datas).flatMap((key) => {
        const formattedData = FormatDataGraph(datas[key]);
        return formattedData.map((data) => data.day);
    });

    const datasets = Object.keys(datas).map((key, index) => {
        const formattedData = FormatDataGraph(datas[key]);
        const chartValues = formattedData.map((data) => data.items.length);
        return {
            label: key,
            data: chartValues,
            borderColor: `rgb(${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, ${getRandomValue(0, 255)})`,
            backgroundColor: `rgba(${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, 0.5)`,
        };
    });

    const chartData = {
        labels: [...new Set(groupedDates)],
        datasets: datasets,
    };

    return (
        <Line options={options} data={chartData} />
    );
}

// Helper function to generate random values for RGB colors
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}