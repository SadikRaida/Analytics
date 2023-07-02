import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { FormatDataGraph } from "../Lib/FormatDataGraph";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ datas }) => {
    const datasetLabel = Object.keys(datas)[0]; // Assuming there's only one dataset
    console.log(datasetLabel);

    // function FormatDataPie(data) {
    //     const formattedData = data.map((item) => {
    //         const date = item.timestamp;
    //         const formattedDate = new Date(date).toISOString().slice(0, 10);
    //         const day = new Date(date).getDate();
    //         const month = new Date(date).getMonth() + 1; // Months are zero-based, so add 1
    //
    //         return {
    //             ...item,
    //             formattedTimestamp: formattedDate,
    //             day: `${day}-${month}`,
    //         };
    //     });
    //
    //     formattedData.sort((a, b) => {
    //         const [dayA, monthA] = a.day.split('-');
    //         const [dayB, monthB] = b.day.split('-');
    //
    //         const dateA = new Date(0, parseInt(monthA, 10) - 1, parseInt(dayA, 10));
    //         const dateB = new Date(0, parseInt(monthB, 10) - 1, parseInt(dayB, 10));
    //
    //         return dateA - dateB;
    //     });
    //
    //     return formattedData;
    // };
    //
    // const formattedData = FormatDataPie(datas[datasetLabel]);
    // const chartValues = formattedData.map((data) => data.items.length);
    //
    // const labels = formattedData.map((data) => data.day);
    // const colors = generateColors(labels.length);
    //
    // const data = {
    //     labels: labels,
    //     datasets: [
    //         {
    //             label: datasetLabel,
    //             data: chartValues,
    //             backgroundColor: colors,
    //             borderColor: colors,
    //             borderWidth: 1,
    //         },
    //     ],
    // };
    // return <Pie data={data} />;
    return <div></div>
};

function generateColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const color = `rgba(${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, 0.2)`;
        colors.push(color);
    }
    return colors;
}

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}