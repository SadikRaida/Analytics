import * as React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export const Graphs = () => {
    const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

    const renderLineChart = () => <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8"/>
            <CartesianGrid stroke="#ccc"/>
            <XAxis dataKey="name"/>
            <YAxis/>
        </LineChart>
    ;
    return (<></>
        // <div className="chart">
        //     <h3 className="chartTitle"> {title}
        //         <ResponsiveContainer width="100%" aspect={4 / 1}>
        //             <LineChart data={data}>
        //                 <XAxis dataKey="name" stroke="#5550bd" />
        //                 <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
        //                 <Tooltip />
        //                 {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        //             </LineChart>
        //         </ResponsiveContainer>
        // </div>
    )
}