import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type LineChartDataItem = {
    day: string;
    items: any[]; // substituez 'any' par le type des éléments si possible
};

type LineChartProps = {
    title: string;
    datas: LineChartDataItem[];
};

export const LineChart = ({ title, datas }: LineChartProps) => {
    const labels = datas.map((data: LineChartDataItem) => data.day);

    const options: any = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
    };
    const data: any = {
        labels,
        datasets: [
            {
                label: title,
                data: datas.map((data: LineChartDataItem) => data.items.length),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };
    return <Line options={options} data={data} />;
};
